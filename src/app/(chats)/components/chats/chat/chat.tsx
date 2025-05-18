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
import { useCallback, useEffect, useState } from 'react'
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
	const [editingMessage, setEditingMessage] = useState<IMessage | null>(null)
	const socket = useSocket()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const queryClient = useQueryClient()

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
		const handleNewMessage = (message: any) => {
			console.log(message)
			if (message.chatId === id) {
				setMessages(prev => {
					if (!prev.some(m => m.id === message.id)) {
						console.log('[Chat] Добавление нового сообщения:', message)
						return [...prev, message]
					}
					return prev
				})
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			} else {
				console.log('[Chat] chatId не совпадает:', message.chatId, id)
			}
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)

		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE)
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
			socket.off(ChatServerEvent.MESSAGE_DELETED)	
		}
	}, [id, queryClient])

	const handleDeleteMessage = (messageId: string) => {
		const messageToDelete = messages.find(m => m.id === messageId)
		if (!messageToDelete) return

		socket.emit(ChatClientEvent.DELETE_MESSAGE, {
			chatId: id,
			messageId: messageId
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
			newContent: newContent
		})

		setMessages(prev => prev.map(m => m.id === messageId ? { ...m, content: newContent, isEdited: true } : m))
		setEditingMessage(null)
		queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
	}

	// useEffect(() => { 
	// 	const handleVisibilityChange = () => {
	// 		if (document.visibilityState === 'visible') {
	// 			markMessagesAsRead()
	// 		}
	// 	}

	// 	document.addEventListener('visibilitychange', handleVisibilityChange)
	// 	return () => {
	// 		document.removeEventListener('visibilitychange', handleVisibilityChange)
	// 	}
	// }, [messages])

	// const markMessagesAsRead = useCallback(() => {
  //   const unreadMessages = messages.filter(
	// 		m => m.senderId !== user?.id && !m.readReceipt
	// 	)

	// 	if (unreadMessages.length > 0) {
	// 		socket.emit(ChatClientEvent.MARK_READ, {
	// 			chatId: id,
	// 			messageIds: unreadMessages.map(m => m.id),
	// 		})
	// 	}
	// }, [messages, id, user?.id])

	// useEffect(() => {
	// 	const handleMessageRead = (readReceipt: IReadReceipt) => {
	// 		setMessages(prev =>
	// 			prev.map(m =>
	// 				m.id === readReceipt.messageId ? { ...m, readReceipt } : m
	// 			)
	// 		)
	// 		queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
	// 	}

	// 	socket.on(ChatServerEvent.MESSAGE_READ, handleMessageRead)
	// 	return () => {
	// 		socket.off(ChatServerEvent.MESSAGE_READ, handleMessageRead)
	// 	}
	// })

	// useEffect(() => {
	// 	markMessagesAsRead()
	// }, [markMessagesAsRead])

	const markMessagesAsRead = useCallback(() => {
		if (!user?.id) return

		const unreadMessages = messages.filter(
			m => m.senderId !== user.id && !m.readReceipt
		)

		if (unreadMessages.length > 0) {
			socket.emit(ChatClientEvent.MARK_READ, {
				chatId: id,
				messageIds: unreadMessages.map(m => m.id),
				// userId: user.id,
			})
		}
	}, [messages, id, user])

	useEffect(() => {
		const handleMessagesRead = (readReceipts: IReadReceipt[]) => {
			setMessages(prev =>
				prev.map(m => {
					const receipt = readReceipts.find(r => r.messageId === m.id)
					return receipt ? { ...m, readReceipt: receipt } : m
				})
			)
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		}

		socket.on(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		return () => {
			socket.off(ChatServerEvent.MESSAGE_READ, handleMessagesRead)
		}
	}, [])

	useEffect(() => {
		const timer = setTimeout(markMessagesAsRead, 300)
		return () => clearTimeout(timer)
	}, [messages, markMessagesAsRead])

	const correspondent = initialData.participants.find(
		p => p.userId !== user?.id
	)

	if (isLoading) return <div className='p-5 text-center'>Загрузка...</div>
	if (error)
		return (
			<div className='p-5'>
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
					<ChatHeader
						onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
						correspondent={correspondent}
					/>

					<div className='px-5 py-3 overflow-y-auto border-t border-border'>
						{messages.map(message => (
							<Message
							key={message.id}
							message={message}
							onDelete={handleDeleteMessage}
							onEdit={() => setEditingMessage(message)}
							isSender={user?.id === message.senderId}
							/>
						))}
					</div>

					<MessageField
						chatId={id}
						userId={user?.id || ''}
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
