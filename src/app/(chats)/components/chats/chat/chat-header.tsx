// components/chats/chat/chat-header.tsx
'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'
import { IParticipant } from '@/types/chat.types'
import { Info, PanelLeft } from 'lucide-react'

interface ChatHeaderProps {
	correspondent?: IParticipant
	onToggleSidebar: () => void
}

export default function ChatHeader({
	correspondent,
	onToggleSidebar,
}: ChatHeaderProps) {
	return (
		<div className='p-5 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<Avatar
					size={64}
					id={correspondent?.userId}
					hasAvatar={correspondent?.profile?.hasAvatar ?? false}
				/>
				<div>
					<h3>
						{correspondent?.displayUsername || 'Неизвестный пользователь'}
					</h3>
					{correspondent?.profile?.job && (
						<p className='text-sm opacity-50'>
							{typeof correspondent.profile.job === 'string'
								? correspondent.profile.job
								: correspondent.profile.job.name}
						</p>
					)}
				</div>
			</div>

			<Button
				variant='ghost'
				size='icon'
				onClick={onToggleSidebar}
				className='rounded-full'
			>
				<PanelLeft size={18} className='rotate-180' />
			</Button>
		</div>
	)
}
