'use client'

import { FormEvent, useState } from 'react'
import { ChatClientEvent } from '@/types/chat.types'
import { useReactQuerySubscription } from '@/hooks/useReactQuerySubscription'

interface MessageFieldProps {
	chatId: string
	userId: string | undefined
}

export default function MessageField({ chatId, userId }: MessageFieldProps) {
	const [message, setMessage] = useState('')
	const send = useReactQuerySubscription()

	const sendMessage = (e: FormEvent) => {
		e.preventDefault()
		if (message.trim()) {
			send({
				operation: 'update',
				entity: 'messages',
				id: chatId,
				payload: {
					senderId: userId,
					content: message,
					sentAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isEdited: false,
					event: ChatClientEvent.SEND_MESSAGE,
				},
			})
			setMessage('')
		}
	}

	const handleTyping = () => {
		if (message.length > 0) {
			send({
				operation: 'update',
				entity: 'chat',
				id: chatId,
				payload: { typingUserId: userId },
			})
		}
	}

	return (
		<form
			onSubmit={sendMessage}
			className='p-5 border-t border-border flex space-x-2'
			onInput={handleTyping}
		>
			<input
				type='text'
				value={message}
				onChange={e => setMessage(e.target.value)}
				className='flex-1 p-2 bg-gray-700 text-white rounded-md focus:outline-none'
				placeholder='Введите сообщение...'
			/>
			<button
				type='submit'
				className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500'
			>
				Отправить
			</button>
		</form>
	)
}
