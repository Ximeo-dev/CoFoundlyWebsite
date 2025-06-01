'use client'

import { useState, useRef, useEffect } from 'react'
import Chat from '../components/chats/chat/chat'
import ChatsList from '../components/chats/list/chats-list'
import { cn } from '@/lib/utils'
import { IChat } from '@/types/chat.types'
import { ArrowLeft } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function ChatsPage() {
	const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
	const [listWidth, setListWidth] = useState(300)
	const [isResizing, setIsResizing] = useState(false)
	const [swipeStartX, setSwipeStartX] = useState(0)
	const [swipeOffset, setSwipeOffset] = useState(0)
	const startXRef = useRef(0)
	const startWidthRef = useRef(300)
	const isMobile = useMediaQuery('(max-width: 768px)')
	const chatListRef = useRef<HTMLDivElement>(null)
	const chatContentRef = useRef<HTMLDivElement>(null)

	const handleMouseDown = (e: React.MouseEvent) => {
		if (isMobile) return
		e.preventDefault()
		setIsResizing(true)
		startXRef.current = e.clientX
		startWidthRef.current = listWidth
		document.body.style.cursor = 'col-resize'
		document.body.style.userSelect = 'none'
	}

	const handleTouchStart = (e: React.TouchEvent) => {
		if (!isMobile || !selectedChat) return
		setSwipeStartX(e.touches[0].clientX)
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isMobile || !selectedChat) return
		const currentX = e.touches[0].clientX
		const diff = currentX - swipeStartX
		if (diff > 0) {
			setSwipeOffset(diff)
		}
	}

	const handleTouchEnd = () => {
		if (!isMobile || !selectedChat) return
		if (swipeOffset > 150) {
			setSelectedChat(null)
		}
		setSwipeOffset(0)
		setSwipeStartX(0)
	}

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing || isMobile) return

			const diff = e.clientX - startXRef.current
			const newWidth = startWidthRef.current + diff

			const MIN_WIDTH = 280
			const MAX_WIDTH = 500
			const clampedWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH)

			setListWidth(clampedWidth)
		}

		const handleMouseUp = () => {
			setIsResizing(false)
			document.body.style.cursor = ''
			document.body.style.userSelect = ''
		}

		if (isResizing) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isResizing, isMobile])

	return (
		<div className='flex h-full w-full'>
			<div
				ref={chatListRef}
				className={cn(
					'relative border-r border-border h-full overflow-hidden flex-shrink-0 lg:ml-20',
					{
						'hidden md:block': selectedChat && isMobile,
						'w-full md:w-auto': isMobile,
					}
				)}
				style={{
					width: isMobile ? '100%' : `${listWidth}px`,
				}}
			>
				<ChatsList
					selectedChatId={selectedChat?.id}
					onSelectChat={setSelectedChat}
				/>
				{!isMobile && (
					<div
						className='absolute right-0 top-0 bottom-0 w-[1px] cursor-col-resize z-20'
						onMouseDown={handleMouseDown}
					/>
				)}
			</div>

			<div
				ref={chatContentRef}
				className={cn(
					'flex-1 h-full bg-background transition-transform duration-300',
					{
						'hidden md:block': !selectedChat,
						'fixed inset-0 z-50 md:static md:z-auto': isMobile && selectedChat,
					}
				)}
				style={{
					transform:
						isMobile && selectedChat && swipeOffset > 0
							? `translateX(${swipeOffset}px)`
							: 'translateX(0)',
					opacity: isMobile && selectedChat ? 1 - swipeOffset / 200 : 1,
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{selectedChat ? (
					<>
						{isMobile && (
							<button
								onClick={() => setSelectedChat(null)}
								className='absolute top-3.5 md:top-6 left-3 z-10 p-2'
							>
								<ArrowLeft size={22} />
							</button>
						)}
						<Chat
							id={selectedChat.id}
							initialData={selectedChat}
							onClose={() => setSelectedChat(null)}
						/>
					</>
				) : (
					<div className='flex items-center justify-center h-full'>
						<p className='bg-border px-2 py-1 rounded-[15px] text-sm'>
							Выберите, кому хотели бы написать
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
