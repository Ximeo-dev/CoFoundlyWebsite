'use client'

import { useState } from 'react'
import ChatListItem from './chat-list-item'
import { useDebounce } from '@/hooks/useDebounce'
import CurrentUser from '../current-user'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { Loader } from 'lucide-react'

export default function ChatsList() {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearchTerm = useDebounce(searchTerm, 300)

	const { data, isLoading, error } = useQuery({
		queryKey: ['chats', debounceSearchTerm],
		queryFn: () => chatService.getChats(debounceSearchTerm),
	})

	return (
		<div className='flex flex-col h-full'>
			<CurrentUser />
			<div className='border-t border-b border-border p-3'>
				<input
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='outline-none w-full bg-transparent text-white placeholder-gray-500'
					placeholder='Поиск...'
				/>
			</div>
			<div className='overflow-y-auto flex-1'>
				{isLoading ? (
					<div className='p-5 flex justify-center'>
						<Loader className='animate-spin text-gray-500' />
					</div>
				) : error ? (
					<p className='p-5 text-red-500'>Ошибка загрузки чатов</p>
				) : data?.length ? (
					data.map(chat => <ChatListItem key={chat.id} chat={chat} />)
				) : (
					<p className='p-5 text-gray-500'>Ничего не найдено</p>
				)}
			</div>
		</div>
	)
}
