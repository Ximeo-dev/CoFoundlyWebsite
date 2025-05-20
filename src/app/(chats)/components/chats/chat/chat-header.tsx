'use client'

import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent, IParticipant } from '@/types/chat.types'
import { PanelLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ChatHeaderProps {
	correspondent?: IParticipant
	onToggleSidebar: () => void
}

const TypingDots = () => {
	return (
		<div className='flex items-center text-xs opacity-50'>
			<div className='flex space-x-1'>
				{[0, 1, 2].map(i => (
					<motion.span
						key={i}
						className='block w-1 h-1 rounded-full'
						animate={{
							y: [0, -3, 0],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 1.2,
							repeat: Infinity,
							repeatDelay: 0,
							delay: i * 0.2,
						}}
					/>
				))}
			</div>
			<span className='ml-1'>печатает</span>
		</div>
	)
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
		<div className='ml-14 md:ml-0 p-5 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<Avatar
					size={64}
					id={correspondent?.userId}
					hasAvatar={correspondent?.profile?.hasAvatar ?? false}
				/>
				<div>
					<h3 className='mr-2'>
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
						<div className='hidden'></div>
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
