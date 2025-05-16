'use client'

import { useAuth } from '@/hooks/useAuth'
import { getSocket } from '@/lib/socket'
import { chatService } from '@/services/chat.service'
import {
	ChatClientEvent,
	ChatServerEvent,
	IMessage,
	ISender,
} from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ChatHeader from './chat-header'
import { Message } from './message'
import MessageField from './message-field'
import { useSocket } from '@/hooks/useSocket'

export default function Chat({ id }: { id: string }) {
	const { user } = useAuth()
	const [messages, setMessages] = useState<IMessage[]>([])
	const socket = useSocket()

	const {
		data: initialMessages,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['get-messages', id],
		queryFn: async () => await chatService.getChatMessages(id),
		enabled: !!id,
		initialData: [],
	})

	useEffect(() => {
		if (initialMessages) {
			setMessages(initialMessages)
		}
	}, [initialMessages])

	useEffect(() => {
		const handleNewMessage = (message: IMessage) => {
			if (message.chatId === id) {
				setMessages(prev => {
					if (!prev.some(m => m.id === message.id)) {
						console.log('[Chat] Добавление нового сообщения:', message)
						return [...prev, message]
					}
					return prev
				})
			} else {
				console.log('[Chat] chatId не совпадает:', message.chatId, id)
			}
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)

		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE)
		}
	}, [id])

	const correspondent: ISender | undefined = messages.find(
		m => m.senderId !== user?.id
	)?.sender

	if (isLoading) return <div className='p-5 text-center'>Загрузка...</div>
	if (error)
		return (
			<div className='p-5 text-red-500'>
				Ошибка загрузки сообщений: {error.message}
			</div>
		)
	if (!messages || messages.length === 0)
		return <div className='p-5 text-gray-500'>Нет сообщений</div>

	return (
		<div
			className='w-8/12 h-full grid'
			style={{ gridTemplateRows: 'auto 1fr auto' }}
		>
			<ChatHeader correspondent={correspondent} />

			<div className='p-5 overflow-y-auto border-t border-border'>
				{messages.map(message => (
					<Message
						key={message.id}
						message={message}
						onDelete={() => {}}
						onEdit={() => {}}
						isSender={user?.id === message.senderId}
					/>
				))}
			</div>

			<MessageField chatId={id} userId={user?.id || ''} />
		</div>
	)
}
