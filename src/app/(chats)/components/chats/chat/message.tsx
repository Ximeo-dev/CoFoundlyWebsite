'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'

interface MessageProps {
	message: IMessage
	onDelete: (messageId: string) => void
	onEdit: (messageId: string, newContent: string) => void
	isSender: boolean
}

export function Message({ message, onDelete, onEdit, isSender }: MessageProps) {
	const handleEdit = () => {
		const newContent =
			prompt('Новое сообщение:', message.content) || message.content
		onEdit(message.id, newContent)
	}

	return (
		<div
			className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}
		>
			<div
				className={`relative flex items-center ${
					isSender ? 'flex-row-reverse' : ''
				}`}
			>
				<Avatar size={64} id={message?.sender?.id} hasAvatar={true} />
				<div className={isSender ? 'mr-3' : 'ml-3'}>
					<div
						className={`text-sm text-white py-1.5 mt-4 px-3 rounded-2xl ${
							isSender
								? 'rounded-tr-none bg-primary'
								: 'rounded-tl-none bg-border'
						}`}
					>
						{message.content}
					</div>
					<div
						className={`text-xs opacity-30 block mt-1.5 ${
							isSender ? 'text-right' : 'text-left'
						}`}
					>
						{dayjs(message.sentAt).format('HH:mm')}
						{message.isEdited && ' (отредактировано)'}
					</div>
					{isSender && (
						<div className='text-xs mt-1 space-x-2'>
							<button
								onClick={() => onDelete(message.id)}
								className='text-red-400 hover:text-red-300'
							>
								Удалить
							</button>
							<button
								onClick={handleEdit}
								className='text-yellow-400 hover:text-yellow-300'
							>
								Редактировать
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
