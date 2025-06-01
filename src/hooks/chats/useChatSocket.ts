import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'
import {
	ChatClientEvent,
	ChatServerEvent,
	IChat,
	IMessage,
	IReadReceipt,
} from '@/types/chat.types'

interface UseChatSocketProps {
	chatId: string
	messages: IMessage[]
	setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
	userId: string
	messagesContainerRef: any
	scrollToBottom: (behavior: ScrollBehavior) => void
}

export default function useChatSocket ({
	chatId,
	messages,
	setMessages,
	userId,
	messagesContainerRef,
	scrollToBottom,
}: UseChatSocketProps) {
	const socket = useSocket()
	const queryClient = useQueryClient()

	const markMessagesAsRead = useCallback(() => {
		if (!userId || !messagesContainerRef.current) return

		const container = messagesContainerRef.current
		const viewportHeight = container.clientHeight
		const scrollPosition = container.scrollTop
		const totalHeight = container.scrollHeight

		const unreadMessages: IMessage[] = []
		messages.forEach(message => {
			if (
				message.senderId !== userId &&
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
					m.senderId !== userId &&
					(!m.readReceipt || m.readReceipt.length === 0)
			)
			if (allUnread.length > 0) {
				socket.emit(ChatClientEvent.MARK_READ, {
					chatId,
					messageIds: allUnread.map(m => m.id),
					userId,
				})
			}
		} else if (unreadMessages.length > 0) {
			socket.emit(ChatClientEvent.MARK_READ, {
				chatId,
				messageIds: unreadMessages.map(m => m.id),
				userId,
			})
		}
	}, [messages, chatId, userId, socket, messagesContainerRef])

	useEffect(() => {
		const handleNewMessage = (message: IMessage) => {
			if (message.chatId === chatId) {
				setMessages(prev => {
					if (prev.some(m => m.id === message.id)) return prev
					const merged = [...prev, message]
					return merged.sort(
						(a, b) =>
							new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
					)
				})

				queryClient.setQueryData(
					['get-direct-chats'],
					(oldData: IChat[] | undefined) => {
						if (!oldData) return []
						return oldData.map(chat =>
							chat.id === chatId
								? { ...chat, messages: [...chat.messages, message] }
								: chat
						)
					}
				)

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
	}, [chatId, queryClient, socket, scrollToBottom, messagesContainerRef])

	useEffect(() => {
		const handleDeletedMessage = (deletedMessage: IMessage) => {
			if (deletedMessage.chatId === chatId) {
				setMessages(prev => prev.filter(m => m.id !== deletedMessage.id))
				queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
			}
		}

		socket.on(ChatServerEvent.MESSAGE_DELETED, handleDeletedMessage)
		return () => {
			socket.off(ChatServerEvent.MESSAGE_DELETED, handleDeletedMessage)
		}
	}, [chatId, queryClient, socket])

	useEffect(() => {
		const handleEditedMessage = (editedMessage: IMessage) => {
			if (editedMessage.chatId === chatId) {
				setMessages(prev =>
					prev.map(m => {
						if (m.id === editedMessage.id) {
							return {
								...m,
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
	}, [chatId, queryClient, socket])

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
	}, [socket, chatId, queryClient])

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
	}, [markMessagesAsRead, messagesContainerRef])

	const handleDeleteMessage = useCallback(
		(messageId: string) => {
			const messageToDelete = messages.find(m => m.id === messageId)
			if (!messageToDelete) return

			socket.emit(ChatClientEvent.DELETE_MESSAGE, {
				chatId,
				messageId,
			})

			setMessages(prev => prev.filter(m => m.id !== messageId))
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		},
		[chatId, messages, socket, queryClient]
	)

	const handleEditMessage = useCallback(
		(messageId: string, newContent: string) => {
			const messageToEdit = messages.find(m => m.id === messageId)
			if (!messageToEdit) return

			const currentReadReceipt = messageToEdit.readReceipt

			socket.emit(ChatClientEvent.EDIT_MESSAGE, {
				chatId,
				messageId,
				newContent,
			})

			setMessages(prev =>
				prev.map(m =>
					m.id === messageId
						? {
								...m,
								content: newContent,
								isEdited: true,
								readReceipt: currentReadReceipt,
						  }
						: m
				)
			)
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		},
		[chatId, messages, socket, queryClient]
	)

	return {
		handleDeleteMessage,
		handleEditMessage,
		markMessagesAsRead,
	}
}
