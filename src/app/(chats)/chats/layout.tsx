// app/(chats)/layout.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import ProfileSidebar from '@/app/(auth)/components/profile-sidebar/profile-sidebar'
import Header from '@/components/layout/header/header'
import NotificationList from '@/components/layout/notification-list/notification-list'

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const { isAuthenticated, isLoading } = useAuth()

	// if (isLoading) return <div>Loading...</div>
	// if (!isAuthenticated) {
	// 	redirect('/welcome')
	// }

	return (
		<div className='grid min-h-screen w-full'>
			<div className='flex-shrink-0'>
				<ProfileSidebar />
			</div>
			<div className='flex-1 h-screen overflow-hidden'>{children}</div>
			<NotificationList />
		</div>
	)
}
