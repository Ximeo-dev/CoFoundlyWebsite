'use client'

import { useAuth } from '@/hooks/useAuth'
import { getSocket } from '@/lib/socket'
import { chatService } from '@/services/chat.service'
import {
	ChatClientEvent,
	ChatServerEvent,
	IChat,
	IMessage,
	ISender,
} from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ChatHeader from './chat-header'
import { Message } from './message'
import MessageField from './message-field'
import { useSocket } from '@/hooks/useSocket'
import { cn } from '@/lib/utils'
import ChatSidebar from '../../chat-sidebar/chat-sidebar'

interface ChatProps {
	id: string
	initialData: IChat
	onClose: () => void
}

export default function Chat({ id, initialData, onClose }: ChatProps) {
	const { user } = useAuth()
	const [messages, setMessages] = useState<IMessage[]>([])
	const socket = useSocket()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

	const correspondent = initialData.participants.find(
		p => p.userId !== user?.id
	)

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
		<div className='flex h-full w-full'>
			<div
				className={cn('h-full', {
					'w-full': !isSidebarOpen,
					'w-[calc(100%-320px)]': isSidebarOpen,
				})}
			>
				<div
					className='w-full h-full grid'
					style={{ gridTemplateRows: 'auto 1fr auto' }}
				>
					<ChatHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} correspondent={correspondent} />

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
			</div>
			<ChatSidebar
				correspondent={correspondent}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
		</div>
	)
}
