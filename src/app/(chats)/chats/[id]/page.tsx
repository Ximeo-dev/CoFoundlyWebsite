import React from 'react'
import Chat from '../../components/chats/chat/chat'
import ChatsList from '../../components/chats/list/chats-list'

interface IChatPage {
	params: Promise<{ id: string }>
}

export default function ChatPage({ params }: IChatPage) {
	const resolvedParams = React.use(params)
	const chatId = resolvedParams.id

	return (
		<div className='flex flex-col sm:flex-row h-full w-full'>
			<div className='w-full sm:w-2/12 border-b sm:border-b-0 sm:border-r border-border overflow-y-auto'>
				<ChatsList />
			</div>
			<div className='flex-1 overflow-y-auto'>
				<Chat id={chatId} />
			</div>
		</div>
	)
}
