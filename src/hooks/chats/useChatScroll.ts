import { useCallback, useEffect } from 'react'
import { ChatClientEvent, IMessage } from '@/types/chat.types'

interface UseChatScrollProps {
	messages: IMessage[]
	userId: string | undefined
	messagesEndRef: any
	isInitialMount: React.MutableRefObject<boolean>
	isLoadingInitial: React.MutableRefObject<boolean>
	chatId: string
	socket: any
}

export default function useChatScroll ({
	messages,
	userId,
	messagesEndRef,
	isInitialMount,
	isLoadingInitial,
	chatId,
	socket,
}: UseChatScrollProps) {
	const findFirstUnreadMessage = useCallback(
		(messages: IMessage[]) => {
			if (!userId) return null
			return messages.find(
				message =>
					message.senderId !== userId &&
					(!message.readReceipt || message.readReceipt.length === 0)
			)
		},
		[userId]
	)

	const scrollToBottom = useCallback(
		(behavior: ScrollBehavior = 'auto') => {
			if (messagesEndRef.current && !isLoadingInitial.current) {
				messagesEndRef.current.scrollIntoView({ behavior })
			}
		},
		[messagesEndRef, isLoadingInitial]
	)

	useEffect(() => {
		if (isInitialMount.current && !isLoadingInitial.current) {
			const firstUnread = findFirstUnreadMessage(messages)
			setTimeout(() => {
				const container = messagesEndRef.current?.closest('.overflow-y-auto')
				if (firstUnread) {
					const element = document.getElementById(`message-${firstUnread.id}`)
					if (element) {
						element.scrollIntoView({ behavior: 'auto', block: 'center' })
					}
					const unreadIds = messages
						.filter(
							m =>
								new Date(m.sentAt) <= new Date(firstUnread.sentAt) &&
								m.senderId !== userId &&
								(!m.readReceipt || m.readReceipt.length === 0)
						)
						.map(m => m.id)

					if (unreadIds.length > 0 && userId) {
						socket.emit(ChatClientEvent.MARK_READ, {
							chatId,
							messageIds: unreadIds,
							userId,
						})
					}
				} else {
					scrollToBottom('auto')
				}
			}, 100)
			isInitialMount.current = false
		}
	}, [
		messages,
		findFirstUnreadMessage,
		scrollToBottom,
		userId,
		socket,
		chatId,
		isLoadingInitial,
	])

	return { scrollToBottom }
}
