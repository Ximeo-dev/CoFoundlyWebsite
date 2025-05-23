'use client'

import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { useAuth } from '@/hooks/useAuth'

export default function CurrentUser() {
  const { user } = useAuth()

  return (
		<div className='p-5 flex items-center justify-between'>
			<div className='flex items-center'>
				<Avatar size={64} hasAvatar className='mr-3'  />
				<div className='text-base'>
					<h2>{user?.displayUsername}</h2>
				</div>
			</div>
		</div>
	)
}