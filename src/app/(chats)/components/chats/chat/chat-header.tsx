// components/chats/chat/chat-header.tsx
'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent, IParticipant } from '@/types/chat.types'
import { Info, PanelLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ChatHeaderProps {
	correspondent?: IParticipant
	onToggleSidebar: () => void
}

export default function ChatHeader({
	correspondent,
	onToggleSidebar,
}: ChatHeaderProps) {
  const socket = useSocket()
	const [isTyping, setIsTyping] = useState(false)

	useEffect(() => {
		const handleTyping = (data: { userId: string; typing: boolean }) => {
			if (data.userId === correspondent?.userId) {
				setIsTyping(data.typing)
			}
		}

		socket.on(ChatServerEvent.USER_TYPING, handleTyping)
		return () => {
			socket.off(ChatServerEvent.USER_TYPING, handleTyping)
		}
	}, [correspondent?.userId, socket])

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
					{isTyping && (
						<span className='text-xs text-gray-500'>печатает...</span>
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
