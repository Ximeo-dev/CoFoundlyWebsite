import type { PropsWithChildren } from 'react'
import CurrentUser from '../components/chats/current-user'
import ChatsList from '../components/chats/list/chats-list'

export default function ChatLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div
			className='grid h-full'
			style={{
				gridTemplateColumns: '.7fr 3fr',
			}}
		>
			<div className='border-r border-border'>
				<CurrentUser />
				<ChatsList />
			</div>
			<div>
				{children}
			</div>
		</div>
  )
}
