'use client'

import { useAuth } from '@/hooks/useAuth'
import { ChatServerEvent, IChat, IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'
import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { useSocket } from '@/hooks/useSocket'
import { useEffect, useRef, useState } from 'react'
import UnreadMessageIndicator from './unread-message-indicator'

interface IChatListItem {
	chat: IChat
	isActive?: boolean
	onClick?: () => void
}

export default function ChatListItem({
	chat,
	isActive,
	onClick,
}: IChatListItem) {
	const { user } = useAuth()
	const correspondent = chat.participants.find(p => p.userId !== user?.id)
	const socket = useSocket()
	const [isTyping, setIsTyping] = useState(false)
	const [unreadCount, setUnreadCount] = useState(0)

	const lastMessage =
		chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null

	const formatMessageDate = (date: string) => {
		const today = dayjs().startOf('day')
		const messageDate = dayjs(date)

		if (messageDate.isSame(today, 'day')) {
			return messageDate.format('HH:mm')
		} else if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
			return 'Вчера'
		} else if (messageDate.isSame(today, 'year')) {
			return messageDate.format('D MMM')
		} else {
			return messageDate.format('D.MM.YYYY')
		}
	}

	const truncateMessage = (text: string, maxLength = 100) => {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength) + '...'
	}

	const lastMessageContent = lastMessage
		? truncateMessage(lastMessage.content)
		: 'Начните общение'

	useEffect(() => {	
		if (!user?.id) return

		const count = chat.messages.reduce((acc, message) => {
			return message.senderId !== user.id && !message.readReceipt ? acc + 1 : acc
		}, 0)

		setUnreadCount(count)
	}, [chat.messages, user?.id])

	useEffect(() => {
		if (!socket || !user?.id) return

		const handleNewMessage = (message: IMessage) => {
			if (message.chatId === chat.id && message.senderId !== user.id) {
				setUnreadCount(prev => prev + 1)
			}
		}

		const handleMessageRead = () => {
			setUnreadCount(0)
		}

		const handleTyping = (data: { userId: string; typing: boolean }) => {
			if (data.userId === correspondent?.userId) {
				setIsTyping(data.typing)
			}
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
		socket.on(ChatServerEvent.MESSAGE_READ, handleMessageRead)
		socket.on(ChatServerEvent.USER_TYPING, handleTyping)

		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE, handleNewMessage)
			socket.off(ChatServerEvent.MESSAGE_READ, handleMessageRead)
			socket.off(ChatServerEvent.USER_TYPING, handleTyping)
		}
	}, [chat.id, correspondent?.userId, socket, user?.id])

	return (
		<div
			onClick={onClick}
			className={`p-2 flex justify-between duration-300 ease-linear transition-colors hover:bg-border/30 rounded-lg ${
				isActive ? 'bg-border' : ''
			}`}
		>
			<div className='border-b lg:border-none border-border flex w-full justify-between pb-2.5 lg:pb-0'>
				<div className='flex items-center gap-x-3 min-w-0'>
					<Avatar
						size={64}
						id={correspondent?.userId}
						hasAvatar={correspondent?.profile?.hasAvatar ?? false}
						className='flex-shrink-0'
						name={correspondent?.displayUsername}
					/>
					<div className='text-sm flex flex-col gap-y-2 min-w-0'>
						<span className='font-medium truncate'>
							{correspondent?.displayUsername || 'Неизвестный пользователь'}
						</span>
						{isTyping ? (
							<span className='opacity-50 italic text-xs'>печатает...</span>
						) : (
							<span className='opacity-30 truncate'>{lastMessageContent}</span>
						)}
					</div>
				</div>
				<div className='flex flex-col h-full justify-between'>
					<span className='text-xs opacity-30 flex-shrink-0 pl-2'>
						{lastMessage ? formatMessageDate(lastMessage.sentAt) : ''}
					</span>
					<UnreadMessageIndicator count={unreadCount} variant='count' />
				</div>
			</div>
		</div>
	)
}
