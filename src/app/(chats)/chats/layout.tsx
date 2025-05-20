import type { PropsWithChildren } from 'react'
import Sidebar from '../components/sidebar/sidebar'

export default function ChatLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen w-full'>
			{/* <Sidebar /> */}
			<div className='flex-1 h-screen overflow-hidden'>{children}</div>
		</div>
	)
}
