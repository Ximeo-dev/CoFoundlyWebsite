'use client'

import { useAuth } from '@/hooks/useAuth'
import { ChatServerEvent, IChat } from '@/types/chat.types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { useSocket } from '@/hooks/useSocket'
import UnreadMessageIndicator from './unread-message-indicator'
import { useEffect, useState } from 'react'
import { Check, CheckCheck } from 'lucide-react'

dayjs.locale('ru')

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

	const isLastMessageFromCurrentUser = lastMessage?.senderId === user?.id

	const isLastMessageRead =
		isLastMessageFromCurrentUser &&
		lastMessage?.readReceipt &&
		lastMessage.readReceipt.length > 0

	useEffect(() => {
		if (!socket || !user?.id || !correspondent?.userId) return

		const handleTyping = (data: { userId: string; typing: boolean }) => {
			if (data.userId === correspondent.userId) {
				setIsTyping(data.typing)
			}
		}

		socket.on(ChatServerEvent.USER_TYPING, handleTyping)

		return () => {
			socket.off(ChatServerEvent.USER_TYPING, handleTyping)
		}
	}, [correspondent?.userId, socket, user?.id])

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
				<div className='flex flex-col h-full justify-between items-end'>
					<div className='flex gap-x-1.5 items-center'>
						{isLastMessageFromCurrentUser && (
							<span className='flex items-center'>
								{isLastMessageRead ? (
									<CheckCheck className='h-4 w-4 text-zinc-100' />
								) : (
									<Check className='h-4 w-4 text-gray-300' />
								)}
							</span>
						)}
						<span className='text-xs opacity-30 flex-shrink-0'>
							{lastMessage ? formatMessageDate(lastMessage.sentAt) : ''}
						</span>
					</div>
					<UnreadMessageIndicator
						count={chat.unreadMessages || 0}
						variant='count'
						className='mt-1'
					/>
				</div>
			</div>
		</div>
	)
}