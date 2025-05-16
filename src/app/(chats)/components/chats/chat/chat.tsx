'use client'

import { useQuery } from '@tanstack/react-query'
import ChatHeader from './chat-header'
import { chatService } from '@/services/chat.service'
import { useAuth } from '@/hooks/useAuth'
import MessageField from './message-field'
import { Message } from './message'
import { IMessages, ISender } from '@/types/chat.types'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'

export default function Chat({ id }: { id: string }) {
	const { user } = useAuth()
	const [messages, setMessages] = useState<IMessages[]>([])

	const {
		data: initialMessages,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['messages', id],
		queryFn: () => chatService.getChatMessages(id),
		enabled: !!id,
		initialData: [],
	})

	useEffect(() => {
		if (initialMessages) {
			setMessages(initialMessages)
		}
	}, [initialMessages])

	useEffect(() => {
		const handleNewMessage = (message: IMessages) => {
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

		socket.on('new-message', handleNewMessage)

		return () => {
			socket.off('new-message', handleNewMessage)
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
