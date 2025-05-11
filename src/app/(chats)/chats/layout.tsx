import type { PropsWithChildren } from 'react'
import Sidebar from '../components/sidebar/sidebar'
import CurrentUser from '../components/chats/current-user'
import ChatsList from '../components/chats/list/chats-list'

export default function ChatLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen w-full grid-cols-[60px_350px_1fr]'>
			<Sidebar />
			<div className='border-r border-border flex flex-col'>
				<CurrentUser />
				<ChatsList />
			</div>
			<div className='flex-1'>{children}</div>
		</div>
	)
}
