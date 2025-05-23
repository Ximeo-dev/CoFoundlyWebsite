import { useState, useEffect, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { IMessage, ChatServerEvent, ChatClientEvent } from '@/types/chat.types'
import { useSocket } from '@/hooks/useSocket'
import { useAuth } from '@/hooks/useAuth'

export const useChatMessages = (chatId: string, userId?: string) => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [editingMessage, setEditingMessage] = useState<IMessage | null>(null)
	const queryClient = useQueryClient()
	const socket = useSocket()

	const { data: initialMessages } = useQuery({
		queryKey: ['get-messages', chatId, 1],
		queryFn: async () => await chatService.getChatMessages(chatId, 1, 30),
		enabled: !!chatId,
		initialData: [],
	})

	useEffect(() => {
		if (initialMessages) {
			const sorted = [...initialMessages].sort(
				(a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
			)
			setMessages(sorted)
		}
	}, [initialMessages])

	const handleNewMessage = useCallback((message: IMessage) => {
		/* ... */
	}, [])

	const handleDeleteMessage = useCallback((messageId: string) => {
		/* ... */
	}, [])

	const handleEditMessage = useCallback(
		(messageId: string, newContent: string) => {
			/* ... */
		},
		[]
	)

	useEffect(() => {
		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		}
	}, [handleNewMessage, socket])

	return {
		messages,
		editingMessage,
		setEditingMessage,
		handleDeleteMessage,
		handleEditMessage,
		// ... другие методы
	}
}
