'use client'

import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'
import TypingDots from '@/components/ui/typing-dots/typing-dots'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent, IParticipant } from '@/types/chat.types'
import { PanelLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

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
			console.log('[ChatHeader] Received typing event:', data)
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
		<div className='ml-14 md:ml-0 p-5 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<Avatar
					size={64}
					id={correspondent?.userId}
					hasAvatar={correspondent?.profile?.hasAvatar ?? false}
					name={correspondent?.displayUsername}
				/>
				<div>
					<h3 className='mr-2 text-lg'>
						{correspondent?.displayUsername || 'Неизвестный пользователь'}
					</h3>
					{isTyping ? (
						<TypingDots />
					) : correspondent?.profile?.job ? (
						<p className='text-sm opacity-50'>
							{typeof correspondent.profile.job === 'string'
								? correspondent.profile.job
								: correspondent.profile.job.name}
						</p>
					) : (
						<div className='h-4' />
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
