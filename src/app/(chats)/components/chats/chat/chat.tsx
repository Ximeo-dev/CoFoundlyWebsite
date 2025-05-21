'use client'

import { useAuth } from '@/hooks/useAuth'
import { chatService } from '@/services/chat.service'
import {
	ChatClientEvent,
	ChatServerEvent,
	IChat,
	IMessage,
	IReadReceipt,
} from '@/types/chat.types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
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

const ACTIVE_CHAT_KEY = 'activeChatId'

export default function Chat({ id, initialData, onClose }: ChatProps) {
	const { user } = useAuth()
	const [messages, setMessages] = useState<IMessage[]>([])
	const [editingMessage, setEditingMessage] = useState<IMessage | null>(null)
	const socket = useSocket()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const queryClient = useQueryClient()
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])

	useEffect(() => {
		localStorage.setItem(ACTIVE_CHAT_KEY, id)
		return () => {
			localStorage.removeItem(ACTIVE_CHAT_KEY)
		}
	}, [id])

	const {
		data: initialMessages,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['get-messages', id],
		queryFn: async () => await chatService.getChatMessages(id, 1),
		enabled: !!id,
		initialData: [],
	})

	useEffect(() => {
		if (initialMessages) {
			setMessages(initialMessages)
		}
	}, [initialMessages])

	useEffect(() => {
		const handleNewMessage = (message: any) => {
			console.log('[Chat] New message received:', message)
			if (message.chatId === id) {
				setMessages(prev => {
					if (!prev.some(m => m.id === message.id)) {
						console.log('[Chat] Adding new message:', message)
						return [...prev, message]
					}
					return prev
				})
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			} else {
				console.log('[Chat] chatId mismatch:', message.chatId, id)
			}
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)

		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		}
	}, [id, queryClient])

	useEffect(() => {
		const handleDeletedMessage = (deletedMessage: IMessage) => {
			if (deletedMessage.chatId === id) {
				setMessages(prev => prev.filter(m => m.id !== deletedMessage.id))
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			}
		}

		socket.on(ChatServerEvent.MESSAGE_DELETED, handleDeletedMessage)

		return () => {
			socket.off(ChatServerEvent.MESSAGE_DELETED, handleDeletedMessage)
		}
	}, [id, queryClient])

	const handleDeleteMessage = (messageId: string) => {
		const messageToDelete = messages.find(m => m.id === messageId)
		if (!messageToDelete) return

		socket.emit(ChatClientEvent.DELETE_MESSAGE, {
			chatId: id,
			messageId: messageId,
		})

		setMessages(prev => prev.filter(m => m.id !== messageId))
		queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
	}

	useEffect(() => {
		const handleEditedMessage = (editedMessage: IMessage) => {
			if (editedMessage.chatId === id) {
				setMessages(prev =>
					prev.map(m => (m.id === editedMessage.id ? editedMessage : m))
				)
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			}
		}

		socket.on(ChatServerEvent.MESSAGE_EDITED, handleEditedMessage)

		return () => {
			socket.off(ChatServerEvent.MESSAGE_EDITED, handleEditedMessage)
		}
	}, [id, queryClient])

	const handleEditMessage = (messageId: string, newContent: string) => {
		const messageToEdit = messages.find(m => m.id === messageId)
		if (!messageToEdit) return

		socket.emit(ChatClientEvent.EDIT_MESSAGE, {
			chatId: id,
			messageId: messageId,
			newContent: newContent,
		})

		setMessages(prev =>
			prev.map(m =>
				m.id === messageId ? { ...m, content: newContent, isEdited: true } : m
			)
		)
		setEditingMessage(null)
		queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
	}

	const markMessagesAsRead = useCallback(() => {
		if (!user?.id || !messagesContainerRef.current) {
			console.log(
				'[Chat] Cannot mark messages as read: user.id or container missing'
			)
			return
		}

		const unreadMessages: IMessage[] = []
		messages.forEach(message => {
			if (
				message.senderId !== user.id &&
				Array.isArray(message.readReceipt) &&
				!message.readReceipt.some(r => r.userId === user.id)
			) {
				const messageElement = document.getElementById(`message-${message.id}`)
				if (messageElement) {
					const rect = messageElement.getBoundingClientRect()
					const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
					if (isVisible) {
						unreadMessages.push(message)
						console.log('[Chat] Marking message as read:', message.id)
					}
				}
			}
		})

		if (unreadMessages.length > 0) {
			const readReceipts = unreadMessages.map(message => ({
				chatId: id,
				messageId: message.id,
				userId: user.id,
				readAt: new Date().toISOString(),
			}))
			socket.emit(ChatClientEvent.MARK_READ, readReceipts)
		}
	}, [messages, id, user, socket])

	useEffect(() => {
		const handleMessagesRead = (readReceipts: IReadReceipt[]) => {
			console.log('[Chat] Received read receipts:', readReceipts)
			setMessages(prev =>
				prev.map(m => {
					const receiptsForMessage = readReceipts.filter(
						r => r.messageId === m.id
					)
					if (receiptsForMessage.length > 0) {
						return {
							...m,
							readReceipt: [...m.readReceipt, ...receiptsForMessage],
						}
					}
					return m
				})
			)
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		}

		socket.on(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		return () => {
			socket.off(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		}
	}, [socket, id, queryClient])

	useEffect(() => {
		const handleMessagesRead = (readReceipts: IReadReceipt[]) => {
			console.log('[Chat] Received read receipts:', readReceipts)
			setMessages(prev =>
				prev.map((m: any) => {
					const receipt = readReceipts.find(r => r.messageId === m.id)
					return receipt ? { ...m, readReceipt: [receipt] } : m
				})
			)
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		}

		socket.on(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		return () => {
			socket.off(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		}
	}, [socket, id, queryClient])

	const correspondent = initialData.participants.find(
		p => p.userId !== user?.id
	)

	if (!user?.id) {
		return (
			<div className='p-5 text-center'>Ошибка: Пользователь не авторизован</div>
		)
	}

	if (isLoading) return <div className='p-5 text-center'>Загрузка...</div>
	if (error)
		return <div className='p-5'>Ошибка загрузки сообщений: {error.message}</div>

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
					<ChatHeader
						onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
						correspondent={correspondent}
					/>

					<div
						ref={messagesContainerRef}
						className='px-5 py-3 overflow-y-auto border-t border-border'
					>
						{messages.map(message => (
							<div key={message.id} id={`message-${message.id}`}>
								<Message
									message={message}
									onDelete={handleDeleteMessage}
									onEdit={() => setEditingMessage(message)}
									isSender={user.id === message.senderId}
								/>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>

					<MessageField
						chatId={id}
						userId={user.id}
						editingMessage={editingMessage}
						onCancelEdit={() => setEditingMessage(null)}
						onSubmitEdit={handleEditMessage}
					/>
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
