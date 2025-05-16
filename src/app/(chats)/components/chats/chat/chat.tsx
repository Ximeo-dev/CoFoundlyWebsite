'use client'

import { useQuery } from '@tanstack/react-query'
import ChatHeader from './chat-header'
import { chatService } from '@/services/chat.service'
import { useAuth } from '@/hooks/useAuth'
import MessageField from './message-field'
import { Message } from './message'
import { IMessages, ISender } from '@/types/chat.types'

export default function Chat({ id }: { id: string }) {
	const { user } = useAuth()
	const { data, isLoading, error } = useQuery({
		queryKey: ['getChatMessages', id],
		queryFn: () => chatService.getChatMessages(id),
	})

	const correspondent: ISender | undefined = data?.find(
		m => m.senderId !== user?.id
	)?.sender

	if (isLoading) return <div className='p-5 text-center'>Загрузка...</div>
	if (error)
		return (
			<div className='p-5 text-red-500'>
				Ошибка загрузки сообщений: {error.message}
			</div>
		)
	if (!data || data.length === 0)
		return <div className='p-5 text-gray-500'>Нет сообщений</div>

	return (
		<div
			className='w-8/12 h-full grid'
			style={{ gridTemplateRows: 'auto 1fr auto' }}
		>
			<ChatHeader correspondent={correspondent} />

			<div className='p-5 overflow-y-auto border-t border-border'>
				{data.map(message => (
					<Message
						key={message.id}
						message={message}
						onDelete={() => {}}
						onEdit={() => {}}
						isSender={user?.id === message.senderId}
					/>
				))}
			</div>

			<MessageField chatId={id} userId={user?.id || ''} />
		</div>
	)
}
