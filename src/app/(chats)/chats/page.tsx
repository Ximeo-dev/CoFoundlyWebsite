'use client'

import { useState, useRef, useEffect } from 'react'
import Chat from '../components/chats/chat/chat'
import ChatsList from '../components/chats/list/chats-list'
import { cn } from '@/lib/utils'
import { IChat } from '@/types/chat.types'

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
  const [listWidth, setListWidth] = useState(300)
  const [isResizing, setIsResizing] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(300)
  const isMobile = false

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = listWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      
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
  }, [isResizing])

  return (
		<div className='flex h-full w-full'>
			{/* Список чатов */}
			<div
				className={cn(
					'relative border-r border-border h-full overflow-hidden flex-shrink-0',
					{
						'hidden sm:block': selectedChat && isMobile,
					}
				)}
				style={{ width: isMobile ? '100%' : `${listWidth}px` }}
			>
				<ChatsList
					selectedChatId={selectedChat?.id}
					onSelectChat={setSelectedChat}
				/>

				{/* Полоса для изменения ширины */}
				{!isMobile && (
					<div
						className='absolute right-0 top-0 bottom-0 w-[1px] cursor-col-resize z-20'
						onMouseDown={handleMouseDown}
					/>
				)}
			</div>

			{/* Область чата */}
			<div
				className={cn('flex-1 h-full', {
					'hidden sm:block': !selectedChat,
					'fixed inset-0 z-50 bg-background sm:static sm:z-auto':
						isMobile && selectedChat,
				})}
			>
				{selectedChat ? (
					<>
						{isMobile && (
							<button
								onClick={() => setSelectedChat(null)}
								className='absolute top-3 left-3 z-10 p-2 bg-background rounded-full sm:hidden'
							>
								← Назад
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
						<p className='text-gray-500'>Выберите, кому хотели бы написать</p>
					</div>
				)}
			</div>
		</div>
	)
}