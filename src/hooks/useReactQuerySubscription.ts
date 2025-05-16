import { API_URL } from '@/constants/api.constants'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

interface WebSocketEvent {
	operation: 'invalidate' | 'update'
	entity: string
	id?: string
	payload?: Record<string, unknown>
}

interface UpdateData {
	id: string
	[key: string]: any
}

export const useReactQuerySubscription = () => {
	const queryClient = useQueryClient()

	const socket = useRef<Socket>(null)

	useEffect(() => {
		socket.current = io(API_URL as string)

		socket.current.on('connect', () => {
			console.log('connected to socket.io server')
		})

		socket.current.on('server-message', (data: WebSocketEvent) => {
			queryClient.invalidateQueries({
				queryKey: [data.entity, data.id].filter(Boolean),
			})
		})

		socket.current.on('update', (data: WebSocketEvent) => {
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

		return () => {
			socket.current?.disconnect()
		}
	}, [queryClient])

	const send = (input: WebSocketEvent) => {
		socket.current?.emit('client-message', input)
	}

	return send
}
