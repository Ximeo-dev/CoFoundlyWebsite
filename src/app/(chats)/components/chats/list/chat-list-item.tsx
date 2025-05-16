'use client'

import { useAuth } from '@/hooks/useAuth'
import { IChat } from '@/types/chat.types'
import Link from 'next/link'
import dayjs from 'dayjs'
import Avatar from '@/app/profile/components/profile-info/avatar'

interface IChatListItem {
	chat: IChat
}

export default function ChatListItem({ chat }: IChatListItem) {
	const { user } = useAuth()
	const correspondent = chat.participants.find(p => p.profile?.id !== user?.id)

	const lastMessage =
		chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null
	const lastMessageTime = lastMessage
		? dayjs(lastMessage.sentAt).format('HH:mm')
		: ''
	const lastMessageContent = lastMessage ? lastMessage.content : 'Нет сообщений'

	return (
		<Link
			href={`/chats/${chat.id}`}
			className='p-5 flex items-center border-b border-border duration-300 ease-linear transition-colors hover:bg-border cursor-pointer animation-slide-fade'
		>
			<Avatar size={64} id={correspondent?.userId} className='w-full' />
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					<span>
						{correspondent?.displayUsername || 'Неизвестный пользователь'}
					</span>
					<span className='text-xs opacity-30'>{lastMessageTime || '---'}</span>
				</div>
				<div className='opacity-30 truncate max-w-[200px]'>
					{lastMessageContent}
				</div>
			</div>
		</Link>
	)
}
