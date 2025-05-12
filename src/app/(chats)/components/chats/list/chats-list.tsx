'use client'

import { useState } from 'react'
import ChatListItem from './chat-list-item'
import { useDebounce } from '@/hooks/useDebounce'

export default function ChatsList() {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearchTerm = useDebounce(searchTerm)

	return (
		<div>
			<div className='border-t border-b border-border p-3'>
				<input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='outline-none' placeholder='Поиск...' />
			</div>
			<div className=''>
				{Array.from({ length: 12 }).map((item, i) => (
					<ChatListItem key={i} />
				))}
			</div>
		</div>
	)
}