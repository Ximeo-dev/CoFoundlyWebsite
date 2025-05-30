'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import ChatListItem from './chat-list-item'
import CurrentUser from '../current-user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { Loader, Search } from 'lucide-react'
import { IChat } from '@/types/chat.types'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent } from '@/types/chat.types'
import dayjs from 'dayjs'
import { useAuth } from '@/hooks/useAuth'

interface ChatsListProps {
	onSelectChat: (chat: IChat) => void
	selectedChatId?: string | null
}

export default function ChatsList({
	onSelectChat,
	selectedChatId,
}: ChatsListProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const socket = useSocket()
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const [initialChatId, setInitialChatId] = useState<string | null>(null)

	const { data, isLoading, error } = useQuery({
		queryKey: ['get-direct-chats'],
		queryFn: async () => await chatService.getChats(),
	})

	useEffect(() => {
		const savedChatId = localStorage.getItem('activeChatId')
		if (savedChatId && !selectedChatId) {
			setInitialChatId(savedChatId)
		}
	}, [])

	useEffect(() => {
		if (initialChatId && onSelectChat) {
			const chat = data?.find(c => c.id === initialChatId)
			if (chat) {
				onSelectChat(chat)
			}
		}
	}, [initialChatId, data, onSelectChat])

	const sortedChats = useMemo(() => {
		if (!data) return []

		return [...data].sort((a, b) => {
			const aLastMessage = a.messages[a.messages.length - 1]
			const bLastMessage = b.messages[b.messages.length - 1]

			const aTime = aLastMessage ? dayjs(aLastMessage.sentAt).valueOf() : 0
			const bTime = bLastMessage ? dayjs(bLastMessage.sentAt).valueOf() : 0

			return bTime - aTime
		})
	}, [data])

	useEffect(() => {
		const handleNewMessage = (message: any) => {
			queryClient.invalidateQueries({ queryKey: ['get-direct-chats'] })
		}

		socket.on(ChatServerEvent.NEW_MESSAGE, handleNewMessage)

		return () => {
			socket.off(ChatServerEvent.NEW_MESSAGE)
		}
	}, [queryClient])

	const filteredChats = useMemo(() => {
		if (!sortedChats) return []

		return sortedChats.filter(chat => {
			const correspondent = chat.participants.find(p => p.userId !== user?.id)
			const username = correspondent?.displayUsername || ''
			return username.toLowerCase().includes(searchTerm.toLowerCase())
		})
	}, [sortedChats, searchTerm])

	return (
		<div className='flex flex-col h-full w-full pb-12 lg:pb-0'>
			<CurrentUser />
			<div className='border-t border-b border-border p-3'>
				<div className='flex justify-between items-center'>
					<input
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='outline-none w-full bg-transparent opacity-50'
						placeholder='Поиск...'
					/>
					<Search className='opacity-50' size={20} />
				</div>
			</div>
			<div className='overflow-y-auto flex-1 p-2'>
				{isLoading ? (
					<div className='p-5 flex justify-center'>
						<Loader className='animate-spin text-gray-500' />
					</div>
				) : error ? (
					<p className='p-5 text-red-500'>Ошибка загрузки чатов</p>
				) : filteredChats.length ? (
					filteredChats.map(chat => (
						<div
							key={chat.id}
							onClick={() => onSelectChat(chat)}
							className='cursor-pointer'
						>
							<ChatListItem chat={chat} isActive={selectedChatId === chat.id} />
						</div>
					))
				) : (
					<p className='p-5 opacity-50'>Нет результатов</p>
				)}
			</div>
		</div>
	)
}
