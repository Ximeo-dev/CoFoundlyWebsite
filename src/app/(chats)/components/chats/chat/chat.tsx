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
import { Loader } from 'lucide-react'
import { groupMessagesByDate } from '@/utils/groupMessagesByDate'
import { isToday, isYesterday, format } from 'date-fns'
import { ru } from 'date-fns/locale'

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
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const socket = useSocket()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const queryClient = useQueryClient()
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const isInitialMount = useRef(true)
	const isLoadingInitial = useRef(true)

	useEffect(() => {
		localStorage.setItem(ACTIVE_CHAT_KEY, id)
		return () => {
			localStorage.removeItem(ACTIVE_CHAT_KEY)
		}
	}, [id])

	const findFirstUnreadMessage = useCallback(
		(messages: IMessage[]) => {
			if (!user?.id) return null
			return messages.find(
				message =>
					message.senderId !== user.id &&
					(!message.readReceipt || message.readReceipt.length === 0)
			)
		},
		[user?.id]
	)

	const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
		if (messagesEndRef.current && !isLoadingInitial.current) {
			messagesEndRef.current.scrollIntoView({ behavior })
		}
	}, [])

	const markMessagesAsRead = useCallback(() => {
		if (!user?.id || !messagesContainerRef.current) return

		const container = messagesContainerRef.current
		const viewportHeight = container.clientHeight
		const scrollPosition = container.scrollTop
		const totalHeight = container.scrollHeight

		const unreadMessages: IMessage[] = []
		messages.forEach(message => {
			if (
				message.senderId !== user.id &&
				(!message.readReceipt || message.readReceipt.length === 0)
			) {
				const element = document.getElementById(`message-${message.id}`)
				if (element) {
					const rect = element.getBoundingClientRect()
					const isVisible =
						rect.top >= container.getBoundingClientRect().top &&
						rect.bottom <= container.getBoundingClientRect().bottom

					if (isVisible) {
						unreadMessages.push(message)
					}
				}
			}
		})

		if (totalHeight - (scrollPosition + viewportHeight) < 100) {
			const allUnread = messages.filter(
				m =>
					m.senderId !== user.id &&
					(!m.readReceipt || m.readReceipt.length === 0)
			)
			if (allUnread.length > 0) {
				socket.emit(ChatClientEvent.MARK_READ, {
					chatId: id,
					messageIds: allUnread.map(m => m.id),
					userId: user.id,
				})
			}
		}
		else if (unreadMessages.length > 0) {
			socket.emit(ChatClientEvent.MARK_READ, {
				chatId: id,
				messageIds: unreadMessages.map(m => m.id),
				userId: user.id,
			})
		}
	}, [messages, id, user, socket])

	const {
		data: initialMessages,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['get-messages', id, 1],
		queryFn: async () => await chatService.getChatMessages(id, 1, 30),
		enabled: !!id,
		initialData: [],
		staleTime: 0,
		gcTime: 0
	})

	useEffect(() => {
		if (initialMessages) {
			const sorted = [...initialMessages].sort(
				(a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
			)
			setMessages(sorted)
			setPage(1)
			setHasMore(initialMessages.length === 30)
			isLoadingInitial.current = false

			if (isInitialMount.current) {
				const firstUnread = findFirstUnreadMessage(sorted)
				setTimeout(() => {
					if (firstUnread) {
						const element = document.getElementById(`message-${firstUnread.id}`)
						if (element) {
							element.scrollIntoView({ behavior: 'auto', block: 'center' })
						}
						const unreadIds = sorted
							.filter(
								m =>
									new Date(m.sentAt) <= new Date(firstUnread.sentAt) &&
									m.senderId !== user?.id &&
									(!m.readReceipt || m.readReceipt.length === 0)
							)
							.map(m => m.id)

						if (unreadIds.length > 0 && user?.id) {
							socket.emit(ChatClientEvent.MARK_READ, {
								chatId: id,
								messageIds: unreadIds,
								userId: user.id,
							})
						}
					} else {
						scrollToBottom('auto')
					}
				}, 100)
				isInitialMount.current = false
			}
		}
	}, [
		initialMessages,
		scrollToBottom,
		findFirstUnreadMessage,
		id,
		socket,
		user?.id,
	])

	const loadMoreMessages = useCallback(async () => {
		if (isLoadingMore || !hasMore) return

		setIsLoadingMore(true)
		try {
			const newMessages = await chatService.getChatMessages(id, page + 1, 30)
			if (newMessages.length === 0) {
				setHasMore(false)
			} else {
				const container = messagesContainerRef.current
				const prevScrollHeight = container?.scrollHeight || 0
				const prevScrollTop = container?.scrollTop || 0

				setMessages(prev => {
					const merged = [...newMessages, ...prev]
					return merged.sort(
						(a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
					)
				})

				if (newMessages.length > 0) {
					setPage(prev => prev + 1)
				}

				setTimeout(() => {
					if (container) {
						const newScrollHeight = container.scrollHeight
						container.scrollTop =
							newScrollHeight - prevScrollHeight + prevScrollTop
					}
				}, 0)
			}
		} catch (error) {
			console.error('Error loading more messages:', error)
		} finally {
			setIsLoadingMore(false)
		}
	}, [id, page, isLoadingMore, hasMore])

	const handleScroll = useCallback(() => {
		const container = messagesContainerRef.current
		if (!container) return

		markMessagesAsRead()

		if (
			container.scrollTop < 50 &&
			hasMore &&
			!isLoadingMore &&
			messages.length >= page * 30
		) {
			loadMoreMessages()
		}
	}, [markMessagesAsRead, hasMore, isLoadingMore, loadMoreMessages, messages.length, page])

	useEffect(() => {
		const container = messagesContainerRef.current
		if (!container) return

		container.addEventListener('scroll', handleScroll)
		return () => {
			container.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	useEffect(() => {
		setPage(1)
		setHasMore(true)
		setMessages([])
		isInitialMount.current = true
		isLoadingInitial.current = true
	}, [id])

	useEffect(() => {
		const handleNewMessage = (message: IMessage) => {
			if (message.chatId === id) {
				setMessages(prev => {
					if (prev.some(m => m.id === message.id)) return prev
					const merged = [...prev, message]
					return merged.sort(
						(a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
					)
				})

				queryClient.setQueryData(['get-direct-chats'], (oldData: IChat[] | undefined) => {
					if (!oldData) return []
					return oldData.map(chat =>
						chat.id === id
							? { ...chat, messages: [...chat.messages, message] }
							: chat
					)
				})

				const container = messagesContainerRef.current
				if (container) {
					const isNearBottom =
						container.scrollHeight -
							container.scrollTop -
							container.clientHeight <
						100
					if (isNearBottom) {
						setTimeout(() => scrollToBottom('smooth'), 0)
					}
				}
			}
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		}
	}, [id, queryClient, socket, scrollToBottom])

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
	}, [id, queryClient, socket])

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
					prev.map(m => {
						if (m.id === editedMessage.id) {
							return {
								...editedMessage,
								readReceipt: m.readReceipt || editedMessage.readReceipt,
							}
						}
						return m
					})
				)
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			}
		}

		socket.on(ChatServerEvent.MESSAGE_EDITED, handleEditedMessage)
		return () => {
			socket.off(ChatServerEvent.MESSAGE_EDITED, handleEditedMessage)
		}
	}, [id, queryClient, socket])

	const handleEditMessage = (messageId: string, newContent: string) => {
		const messageToEdit = messages.find(m => m.id === messageId)
		if (!messageToEdit) return

		const currentReadReceipt = messageToEdit.readReceipt

		socket.emit(ChatClientEvent.EDIT_MESSAGE, {
			chatId: id,
			messageId: messageId,
			newContent: newContent,
		})

		setMessages(prev =>
			prev.map(m =>
				m.id === messageId ? { ...m, content: newContent, isEdited: true, readReceipt: currentReadReceipt } : m
			)
		)
		setEditingMessage(null)
		queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
	}

	useEffect(() => {
		const container = messagesContainerRef.current
		if (!container) return

		const handleScroll = () => {
			markMessagesAsRead()
		}

		container.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', handleScroll)

		return () => {
			container.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
		}
	}, [markMessagesAsRead])

	useEffect(() => {
		const handleMessagesRead = (readReceipts: IReadReceipt[]) => {
			setMessages(prev =>
				prev.map(m => {
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
						{isLoadingMore && (
							<div className='text-center py-2'>
								<Loader />
							</div>
						)}
						{Object.entries(groupMessagesByDate(messages)).map(
							([date, messagesForDate]) => (
								<div key={date}>
									<div className='text-center text-sm opacity-50 py-5'>
										<span className='bg-background border border-border py-1.5 px-2.5 rounded-[15px]'>
											{isToday(new Date(date))
												? 'Сегодня'
												: isYesterday(new Date(date))
												? 'Вчера'
												: format(new Date(date), 'd MMMM', { locale: ru })}
										</span>
									</div>
									{messagesForDate.map((message, i) => (
										<div
											key={`${message.id}-${i}`}
											id={`message-${message.id}`}
										>
											<Message
												message={message}
												onDelete={handleDeleteMessage}
												onEdit={() => setEditingMessage(message)}
												isSender={user.id === message.senderId}
											/>
										</div>
									))}
								</div>
							)
						)}
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
