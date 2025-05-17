'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/shadcn/context-menu'
import { IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'
import { Copy, Edit, Trash2 } from 'lucide-react'

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
		if (newContent !== message.content) {
			onEdit(message.id, newContent)
		}
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(message.content)
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className={`flex mb-2.5`}>
					<div className='relative flex flex-col'>
						<div className={`flex items-end gap-2 flex-row`}>
							<Avatar
								smallChatAvatar
								size={64}
								id={message?.sender?.id}
								hasAvatar={true}
								className='flex-shrink-0'
							/>
							<div
								className={`text-sm text-white py-2 px-3 rounded-2xl rounded-bl-none relative ${
									isSender ? 'bg-[#6B7480]' : 'bg-border'
								}`}
								style={{
									maxWidth: '700px',
									wordBreak: 'break-word',
								}}
							>
								<div className='whitespace-pre-wrap pr-10'>
									{message.content}
								</div>
								<div className='absolute right-2 bottom-1 flex items-center gap-1'>
									{message.isEdited && (
										<span className='text-[10px] opacity-30'>ред.</span>
									)}
									<span className='text-xs opacity-30'>
										{dayjs(message.sentAt).format('HH:mm')}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContextMenuTrigger>

			<ContextMenuContent className='w-48'>
				<ContextMenuItem onClick={handleCopy} className='cursor-pointer'>
					<Copy className='mr-2 h-4 w-4' />
					Копировать
				</ContextMenuItem>
				{isSender && (
					<>
						<ContextMenuItem onClick={handleEdit}>
							<Edit className='mr-2 h-4 w-4' />
							Редактировать
						</ContextMenuItem>
						<ContextMenuItem onClick={() => onDelete(message.id)}>
							<Trash2 className='mr-2 h-4 w-4' />
							Удалить
						</ContextMenuItem>
					</>
				)}
			</ContextMenuContent>
		</ContextMenu>
	)
}
