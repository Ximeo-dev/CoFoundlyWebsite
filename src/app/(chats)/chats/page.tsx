import Chat from '../components/chats/chat/chat'
import ChatsList from '../components/chats/list/chats-list'

export default function ChatsPage() {
	return (
		<div className='flex flex-col sm:flex-row h-full w-full'>
			<div className='w-full sm:w-2/12 border-b sm:border-b-0 sm:border-r border-border overflow-y-auto'>
				<ChatsList />
			</div>
			<div className='flex-1 overflow-y-auto'>
				{/* <Chat  /> */}
			</div>
		</div>
	)
}
