import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { IMessage } from '@/types/chat.types'
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseChatMessagesProps {
	chatId: string
	messagesContainerRef: any
}

export default function useChatMessages ({
	chatId,
	messagesContainerRef,
}: UseChatMessagesProps) {
	const [messages, setMessages] = useState<IMessage[]>([])
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const isInitialMount = useRef(true)
	const isLoadingInitial = useRef(true)

	const {
		data: initialMessages,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['get-messages', chatId, 1],
		queryFn: async () => await chatService.getChatMessages(chatId, 1, 30),
		enabled: !!chatId,
		initialData: [],
		staleTime: 0,
		gcTime: 0,
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
		}
	}, [initialMessages])

	const loadMoreMessages = useCallback(async () => {
		if (isLoadingMore || !hasMore) return

		setIsLoadingMore(true)
		try {
			const newMessages = await chatService.getChatMessages(
				chatId,
				page + 1,
				30
			)
			if (newMessages.length === 0) {
				setHasMore(false)
			} else {
				const container = messagesContainerRef.current
				const prevScrollHeight = container?.scrollHeight || 0
				const prevScrollTop = container?.scrollTop || 0

				setMessages(prev => {
					const existingIds = new Set(prev.map(m => m.id))
					const uniqueNewMessages = newMessages.filter(
						m => !existingIds.has(m.id)
					)
					const merged = [...uniqueNewMessages, ...prev]
					return merged.sort(
						(a, b) =>
							new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
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
	}, [chatId, page, isLoadingMore, hasMore, messagesContainerRef])

	const handleScroll = useCallback(() => {
		const container = messagesContainerRef.current
		if (!container) return

		if (
			container.scrollTop < 50 &&
			hasMore &&
			!isLoadingMore &&
			messages.length >= page * 30
		) {
			loadMoreMessages()
		}
	}, [
		hasMore,
		isLoadingMore,
		loadMoreMessages,
		messages.length,
		page,
		messagesContainerRef,
	])

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
	}, [chatId])

	return {
		messages,
		setMessages,
		isLoading,
		error,
		isLoadingMore,
		hasMore,
		isInitialMount,
		isLoadingInitial,
	}
}
