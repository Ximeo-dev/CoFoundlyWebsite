'use client'

import { FormEvent, useState, useCallback } from 'react'
import { ChatClientEvent } from '@/types/chat.types'
import { Send } from 'lucide-react'
import { socket } from '@/lib/socket'

interface MessageFieldProps {
	chatId: string
	userId: string | undefined
}

export default function MessageField({ chatId, userId }: MessageFieldProps) {
	const [message, setMessage] = useState('')

	const sendMessage = useCallback(
		(e: FormEvent) => {
			e.preventDefault()
			if (!userId) {
				return
			}
			if (!message.trim()) {
				return
			}

			const messageData = {
				event: ChatClientEvent.SEND_MESSAGE,
				content: message,
				recipientId: 'cd282006-34ba-497f-9e8b-a8bcc98d6dd6',
			}
			console.log('[client] Отправка сообщения:', messageData)
			socket.emit('client-message', messageData)
			setMessage('')
		},
		[message, chatId, userId]
	)

	const handleTyping = useCallback(() => {
		if (message.length > 0 && userId) {
			const eventData = {
				event: ChatClientEvent.TYPING,
				payload: {
					chatId,
					userId,
				},
			}
			socket.emit('client-message', eventData)
		}
	}, [message, chatId, userId])

	return (
		<form
			className='p-5 border-t border-border flex space-x-2'
			onSubmit={sendMessage}
			onInput={handleTyping}
		>
			<input
				type='text'
				value={message}
				onChange={e => setMessage(e.target.value)}
				className='rounded-lg border placeholder:text-[#585654] flex-1 p-2 focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
				placeholder='Сообщение...'
				disabled={!userId}
			/>
			<button
				type='submit'
				className='rounded-lg border px-4 py-2 text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 rounded-md disabled:opacity-50'
				disabled={!userId || !message.trim()}
			>
				<Send size={18} />
			</button>
		</form>
	)
}
