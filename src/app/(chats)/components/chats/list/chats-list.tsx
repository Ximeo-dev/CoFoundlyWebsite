'use client'

import { useState } from 'react'
import ChatListItem from './chat-list-item'
import CurrentUser from '../current-user'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { Loader } from 'lucide-react'
import { IChat } from '@/types/chat.types'

interface ChatsListProps {
	onSelectChat: (chat: IChat) => void
	selectedChatId?: string | null
}

export default function ChatsList({
	onSelectChat,
	selectedChatId,
}: ChatsListProps) {
	const [searchTerm, setSearchTerm] = useState('')

	const { data, isLoading, error } = useQuery({
		queryKey: ['get-direct-chats'],
		queryFn: async () => await chatService.getChats(),
	})

	return (
		<div className='flex flex-col h-full w-full'>
			<CurrentUser />
			<div className='border-t border-b border-border p-3'>
				<input
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='outline-none w-full bg-transparent text-white placeholder-gray-500'
					placeholder='Поиск...'
				/>
			</div>
			<div className='overflow-y-auto flex-1 p-2'>
				{isLoading ? (
					<div className='p-5 flex justify-center'>
						<Loader className='animate-spin text-gray-500' />
					</div>
				) : error ? (
					<p className='p-5 text-red-500'>Ошибка загрузки чатов</p>
				) : data?.length ? (
					data.map(chat => (
						<div
							key={chat.id}
							onClick={() => onSelectChat(chat)}
							className='cursor-pointer'
						>
							<ChatListItem chat={chat} isActive={selectedChatId === chat.id} />
						</div>
					))
				) : (
					<p className='p-5 text-gray-500'>Ничего не найдено</p>
				)}
			</div>
		</div>
	)
}
