'use client'

import { useAuth } from '@/hooks/useAuth'
import { IChat } from '@/types/chat.types'
import dayjs from 'dayjs'
import Avatar from '@/app/profile/components/profile-info/avatar'

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

	const lastMessage =
		chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null
	const lastMessageTime = lastMessage
		? dayjs(lastMessage.sentAt).format('HH:mm')
		: ''

	const truncateMessage = (text: string, maxLength = 100) => {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength) + '...'
	}

	const lastMessageContent = lastMessage
		? truncateMessage(lastMessage.content)
		: 'Нет сообщений'

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
					<span className='opacity-30 truncate'>{lastMessageContent}</span>
				</div>
			</div>
			<span className='text-xs opacity-30 flex-shrink-0 pl-2'>
				{lastMessageTime || '---'}
			</span>
		</div>
	)
}
