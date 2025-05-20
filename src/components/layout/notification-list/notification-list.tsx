'use client'

import { useNotifications } from '@/hooks/useNotifications'
import Avatar from '@/app/profile/components/profile-info/avatar'
import { X } from 'lucide-react'

const MAX_CONTENT_LENGTH = 40

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) return text
	return text.slice(0, maxLength) + '...'
}

export const NotificationList = () => {
	const { notifications } = useNotifications()

	return (
		<div className='fixed top-5 right-5 z-[100]'>
			{notifications.map(notification => (
				<div
					key={notification.notification.id}
					className='bg-[#292A2E] rounded-lg border border-border mb-3 px-3.5 py-2.5 relative max-w-[350px] max-h-[95px]'
				>
					<div className='flex gap-x-4'>
						<Avatar
							size={128}
							notificationAvatar
							hasAvatar
							name={notification.data.sender.displayUsername}
							id={notification.data.sender.id}
						/>
						<div className='flex flex-col gap-y-1.5 whitespace-pre-wrap'>
							<span className='text-lg'>
								{notification.data.sender.displayUsername}
							</span>
							<span className='text-xs opacity-60'>
								{truncateText(notification.data.content, MAX_CONTENT_LENGTH)}
							</span>
						</div>
					</div>
					<div
						className='absolute top-2 right-2'
					>
						<X
							size={16}
							className='text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer'
						/>
					</div>
				</div>
			))}
		</div>
	)
}
