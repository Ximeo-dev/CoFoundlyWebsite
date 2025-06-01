'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState, useRef } from 'react'
import ChatHeader from './chat-header'
import MessageField from './message-field'
import { useSocket } from '@/hooks/useSocket'
import { cn } from '@/lib/utils'
import ChatSidebar from '../../chat-sidebar/chat-sidebar'
import { IChat, IMessage, IParticipant } from '@/types/chat.types'
import useChatStorage from '@/hooks/chats/useChatStorage'
import useChatNotifications from '@/hooks/chats/useChatNotifications'
import useChatMessages from '@/hooks/chats/useChatMessages'
import useChatScroll from '@/hooks/chats/useChatScroll'
import useChatSocket from '@/hooks/chats/useChatSocket'
import MessagesList from './messages-list'


interface ChatProps {
	id: string
	initialData: IChat
	onClose: () => void
}

export default function Chat({ id, initialData, onClose }: ChatProps) {
	const { user } = useAuth()
	const [editingMessage, setEditingMessage] = useState<IMessage | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const socket = useSocket()

	const correspondent = initialData.participants.find(
		p => p.userId !== user?.id
	)

	useChatStorage(id)
	useChatNotifications({ correspondent })

	const {
		messages,
		setMessages,
		isLoading,
		error,
		isLoadingMore,
		isInitialMount,
		isLoadingInitial,
	} = useChatMessages({ chatId: id, messagesContainerRef })

	const { scrollToBottom } = useChatScroll({
		messages,
		userId: user?.id,
		messagesEndRef,
		isInitialMount,
		isLoadingInitial,
		chatId: id,
		socket,
	})

	const { handleDeleteMessage, handleEditMessage } = useChatSocket({
		chatId: id,
		messages,
		setMessages,
		userId: user?.id || '',
		messagesContainerRef,
		scrollToBottom,
	})

	if (!user?.id) {
		return <div className='p-5 text-center'></div>
	}

	if (isLoading) return <div className='p-5 text-center'>Загрузка...</div>
	if (error)
		return <div className='p-5'>Ошибка загрузки сообщений: {error.message}</div>

	return (
		<div className='flex h-full w-full'>
			<div
				className={cn('h-full', {
					'w-full': !isSidebarOpen,
					'w-[calc(100%-320px)]': isSidebarOpen,
				})}
			>
				<div
					className='w-full h-full grid'
					style={{ gridTemplateRows: 'auto 1fr auto' }}
				>
					<ChatHeader
						onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
						correspondent={correspondent}
					/>

					<div
						ref={messagesContainerRef}
						className='px-5 py-3 overflow-y-auto border-t border-border'
					>
						<MessagesList
							messages={messages}
							userId={user.id}
							isLoadingMore={isLoadingMore}
							onDelete={handleDeleteMessage}
							onEdit={setEditingMessage}
						/>
						<div ref={messagesEndRef} />
					</div>

					<MessageField
						chatId={id}
						userId={user.id}
						editingMessage={editingMessage}
						onCancelEdit={() => setEditingMessage(null)}
						onSubmitEdit={handleEditMessage}
					/>
				</div>
			</div>
			<ChatSidebar
				correspondent={correspondent}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
		</div>
	)
}
