'use client'

import { IParticipant } from '@/types/chat.types'
import { X } from 'lucide-react'
import Avatar from '@/app/profile/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'

interface ChatSidebarProps {
	correspondent?: IParticipant
	isOpen: boolean
	onClose: () => void
}

export default function ChatSidebar({
	correspondent,
	isOpen,
	onClose,
}: ChatSidebarProps) {
	if (!correspondent || !isOpen) return null

	return (
		<div className='w-80 border-l border-border h-full bg-background p-4 overflow-y-auto'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-lg font-semibold'>Информация</h3>
				<Button
					variant='ghost'
					size='icon'
					onClick={onClose}
					className='rounded-full'
				>
					<X size={18} />
				</Button>
			</div>

			<div className='flex flex-col items-center mb-6'>
				<Avatar
					size={64}
					id={correspondent.userId}
					hasAvatar={correspondent.profile?.hasAvatar ?? false}
				/>
				<h2 className='text-xl font-bold mt-4'>
					{correspondent.displayUsername}
				</h2>
				{correspondent.profile?.job && (
					<p className='text-muted-foreground'>
						{correspondent.displayUsername}
					</p>
				)}
			</div>

			{correspondent.profile?.bio && (
				<div className='mb-6'>
					<h4 className='font-medium mb-2'>О себе</h4>
					<p className='text-muted-foreground'>{correspondent.profile.bio}</p>
				</div>
			)}

			{/* {correspondent.profile?.skills?.length > 0 && (
				<div className='mb-6'>
					<h4 className='font-medium mb-2'>Навыки</h4>
					<div className='flex flex-wrap gap-2'>
						{correspondent.profile.skills.map(skill => (
							<span
								key={skill.name}
								className='bg-secondary px-3 py-1 rounded-full text-sm'
							>
								{skill.name}
							</span>
						))}
					</div>
				</div>
			)} */}
		</div>
	)
}
