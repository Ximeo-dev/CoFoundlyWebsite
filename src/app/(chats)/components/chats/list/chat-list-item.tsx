'use client'

import { useAuth } from '@/hooks/useAuth'
import { ChatServerEvent, IChat } from '@/types/chat.types'
import dayjs from 'dayjs'
import Avatar from '@/app/profile/components/profile-info/avatar'
import { useSocket } from '@/hooks/useSocket'
import { useEffect, useRef, useState } from 'react'

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
	// const typingTimeout = useRef<NodeJS.Timeout>(null)

	const lastMessage =
		chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null

	const lastMessageTime = lastMessage
		? dayjs(lastMessage.sentAt).format('HH:mm')
		: ''

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
		: 'Нет сообщений'

		useEffect(() => {
			const handleTyping = (data: { userId: string; typing: boolean }) => {
				console.log(
					`Received typing status from ${data.userId}: ${data.typing}`
				)
				if (data.userId === correspondent?.userId) {
					setIsTyping(data.typing)
				}
			}

			socket.on(ChatServerEvent.USER_TYPING, handleTyping)
			return () => {
				socket.off(ChatServerEvent.USER_TYPING, handleTyping)
			}
		}, [correspondent?.userId, socket])

	return (
		<div
			onClick={onClick}
			className={`p-2 flex justify-between duration-300 ease-linear transition-colors hover:bg-border/30 rounded-lg ${
				isActive ? 'bg-border' : ''
			}`}
		>
			<div className='flex items-center gap-x-3 min-w-0'>
				<Avatar
					size={64}
					id={correspondent?.userId}
					hasAvatar={correspondent?.profile?.hasAvatar ?? false}
					className='flex-shrink-0'
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
			<span className='text-xs opacity-30 flex-shrink-0 pl-2'>
				{lastMessage ? formatMessageDate(lastMessage.sentAt) : '---'}
			</span>
		</div>
	)
}
