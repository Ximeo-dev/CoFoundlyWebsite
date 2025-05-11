import type { Metadata } from 'next'
import ChatsMain from '../components/chats-main'

export const metadata: Metadata = {
  title: 'Чаты',
}

export default function ChatsPage() {
  return (
		<div className='h-full w-full flex items-center justify-center'>
			<div className='bg-background border border-border px-4 py-1 rounded-[15px]'>
				<p className='text-sm'>Выбери, кому хотели бы написать</p>
			</div>
		</div>
	)
}
