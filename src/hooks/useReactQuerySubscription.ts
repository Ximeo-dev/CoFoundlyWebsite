import { WS_URL } from '@/constants/api.constants'
import { ChatClientEvent, IMessage } from '@/types/chat.types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

interface WebSocketEvent {
	operation: 'invalidate' | 'update'
	entity: string
	id?: string
	payload?: Record<string, unknown>
	event?: string
}

interface UpdateData {
	id: string
	[key: string]: any
}

export const useReactQuerySubscription = () => {
	const queryClient = useQueryClient()
	const socket = useRef<Socket | null>(null)

	useEffect(() => {
		const s = io(WS_URL, {
			path: '/socket.io',
			transports: ['websocket'],
			withCredentials: true,
		})
		socket.current = s

		s.on('connect', () => {
			console.log('[socket] Подключено к серверу Socket.io')
		})

		s.on('server-message', (data: WebSocketEvent) => {
			console.log('[socket] server-message:', data)
			queryClient.invalidateQueries({
				queryKey: [data.entity, data.id].filter(Boolean),
			})
		})

		s.on('update', (data: WebSocketEvent) => {
			console.log('[socket] update:', data)
			queryClient.setQueriesData<UpdateData[] | UpdateData | undefined>(
				{ queryKey: [data.entity, data.id] },
				oldData => {
					const update = (entity: UpdateData) =>
						entity.id === data.id ? { ...entity, ...data.payload } : entity
					return Array.isArray(oldData)
						? oldData.map(update)
						: update(oldData as UpdateData)
				}
			)
		})

		s.on('errors', error => {
			console.log(error)
		})

		s.on('new-message', (message: IMessage) => {
			console.log('[socket] new-message:', message)
			queryClient.setQueryData<IMessage[]>(
				['messages', message.chatId],
				(oldMessages = []) => [...oldMessages, message]
			)
		})

		return () => {
			console.log('[socket] Отключение от сервера')
			s.disconnect()
		}
	}, [queryClient])

	const sendMessage = (dto: any) => {
		return new Promise((resolve, reject) => {
			socket.current.emit(
				ChatClientEvent.SEND_MESSAGE,
				dto,
				(response: any) => {
					resolve(response)
				}
			)
		})
	}

	const emitTyping = (chatId: string, userId: string) => {
		const eventData: WebSocketEvent = {
			operation: 'update',
			entity: 'chat',
			id: chatId,
			event: ChatClientEvent.TYPING,
			payload: {
				typingUserId: userId,
			},
		}
		// console.log('[socket] emitTyping:', eventData)
		socket.current?.emit('client-message', eventData)
	}

	return { send, emitTyping }
}
