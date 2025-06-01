'use client'

import { IMessage } from '@/types/chat.types'
import { groupMessagesByDate } from '@/utils/groupMessagesByDate'
import { isToday, isYesterday, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Loader } from 'lucide-react'
import { Message } from './message'

interface MessagesListProps {
	messages: IMessage[]
	userId: string
	isLoadingMore: boolean
	onDelete: (messageId: string) => void
	onEdit: (message: IMessage) => void
}

export default function MessagesList ({
	messages,
	userId,
	isLoadingMore,
	onDelete,
	onEdit,
}: MessagesListProps) {
	return (
		<>
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
							<div key={`${message.id}-${i}`} id={`message-${message.id}`}>
								<Message
									message={message}
									onDelete={onDelete}
									onEdit={() => onEdit(message)}
									isSender={userId === message.senderId}
								/>
							</div>
						))}
					</div>
				)
			)}
		</>
	)
}
