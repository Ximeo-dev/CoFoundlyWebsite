'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { useProfile } from '@/hooks/anket/useProfile'
import { LogOut } from 'lucide-react'

export default function CurrentUser() {
  const { anket } = useProfile()

  return (
		<div className='p-5 flex items-center justify-between'>
			<div className='flex items-center'>
				<Avatar size={64} className='mr-4' />
				<div className='text-sm'>
					<h2>{anket?.name}</h2>
					<h2 className='opacity-30'>{anket?.job?.name}</h2>
				</div>
			</div>
			<button className='text-[#7c7275] hover:text-white transition-colors ease-linear duration-300 cursor-pointer'>
				<LogOut />
			</button>
		</div>
	)
}