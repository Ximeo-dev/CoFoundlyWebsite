'use client'

import Avatar from '@/app/(auth)/components/profile-info/avatar'
import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/shadcn/context-menu'
import { IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'
import { Check, CheckCheck, Copy, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface MessageProps {
	message: IMessage
	onDelete: (messageId: string) => void
	onEdit: (message: IMessage) => void
	isSender: boolean
}

export function Message({ message, onDelete, onEdit, isSender }: MessageProps) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [contextMenuOpen, setContextMenuOpen] = useState(false)

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)

		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText(message.content)
	}

	const handleEdit = () => {
		onEdit(message)
	}

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true)
	}

	const confirmDelete = () => {
		onDelete(message.id)
		setIsDeleteModalOpen(false)
	}

	const handleMessageClick = (e: React.MouseEvent) => {
		if (isMobile) {
			e.preventDefault()
			setContextMenuOpen(true)
		}
	}

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<div
						className={`flex mb-3`}
						onClick={handleMessageClick}
						onContextMenu={e => {
							if (!isMobile) {
								e.preventDefault()
								setContextMenuOpen(true)
							}
						}}
					>
						<div className='relative flex flex-col'>
							<div className={`flex items-end gap-2 flex-row`}>
								<Avatar
									smallChatAvatar
									size={64}
									id={message?.sender?.id}
									hasAvatar={true}
									className='flex-shrink-0'
									name={message?.sender?.displayUsername}
								/>
								<div
									className={`text-sm text-white rounded-2xl rounded-bl-none relative dark:border-none border border-border ${
										message.isEdited ? 'py-2 pl-3' : 'py-1.5 px-3'
									} ${
										isSender
											? 'bg-black/70 dark:bg-[#6B7480]'
											: 'dark:bg-border bg-white'
									}`}
									style={{
										maxWidth: '700px',
										wordBreak: 'break-word',
									}}
								>
									<div
										className={`dark:text-white ${
											isSender ? '' : 'text-black'
										} whitespace-pre-wrap ${
											message.isEdited && isSender
												? 'pr-34'
												: message.isEdited && !isSender
												? 'pr-28'
												: isSender
												? 'pr-14'
												: 'pr-10'
										}`}
									>
										{message.content}
									</div>
									<div className='absolute right-2.5 bottom-[1.5px] flex items-center gap-1'>
										{message.isEdited && (
											<span
												className={`text-xs ${
													isSender ? '' : 'text-gray-300 text-black'
												} dark:opacity-50`}
											>
												изменено
											</span>
										)}
										<span
											className={`text-xs ${
												isSender ? '' : 'text-gray-300 text-black'
											} dark:opacity-50`}
										>
											{dayjs(message.sentAt).format('HH:mm')}
										</span>
										{isSender &&
											(Array.isArray(message.readReceipt) &&
											message.readReceipt.length > 0 ? (
												<CheckCheck className='h-4 w-4 text-zinc-100' />
											) : (
												<Check className='h-4 w-4 text-gray-300' />
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</ContextMenuTrigger>

				{contextMenuOpen && (
					<ContextMenuContent
						className='w-48'
						onInteractOutside={() => setContextMenuOpen(false)}
					>
						<ContextMenuItem onClick={handleCopy} className='cursor-pointer'>
							<Copy className='mr-2 h-4 w-4' />
							Копировать
						</ContextMenuItem>
						{isSender && (
							<>
								<ContextMenuItem
									className='cursor-pointer'
									onClick={handleEdit}
								>
									<Edit className='mr-2 h-4 w-4' />
									Редактировать
								</ContextMenuItem>
								<ContextMenuItem
									className='cursor-pointer'
									onClick={handleDeleteClick}
								>
									<Trash2 className='mr-2 h-4 w-4' />
									Удалить
								</ContextMenuItem>
							</>
						)}
					</ContextMenuContent>
				)}
			</ContextMenu>

			<Modal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				className='p-3'
			>
				<div>
					<p>Вы уверены, что хотите удалить это сообщение?</p>
					<div className='flex items-center justify-center gap-x-5 mt-8'>
						<Button
							variant='outline'
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Отмена
						</Button>
						<Button variant='destructive' onClick={confirmDelete}>
							Удалить
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
