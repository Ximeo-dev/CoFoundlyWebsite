import { PropsWithChildren } from 'react'
import CurrentUser from '../current-user'
import ChatsList from '../list/chats-list'

interface IChat extends PropsWithChildren {}

export default function Chat({ children }: IChat) {
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
				{<>{children}</> && (
					<div className='h-full w-full flex items-center justify-center'>
						<div className='bg-[#d9d7d7] dark:bg-[#111111] border border-border px-4 py-2 rounded-[15px]'>
							<p className='text-sm'>Выбери, кому хотели бы написать</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}