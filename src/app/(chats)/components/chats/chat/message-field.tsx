'use client'

import { FormEvent, useState, useCallback, useEffect, useRef } from 'react'
import { ChatClientEvent, IMessage } from '@/types/chat.types'
import { Send } from 'lucide-react'
import { useSocket } from '@/hooks/useSocket'

interface MessageFieldProps {
	chatId: string
	userId: string | undefined
	editingMessage: IMessage | null
	onCancelEdit: () => void
	onSubmitEdit: (messageId: string, newContent: string) => void
}

export default function MessageField({
	chatId,
	userId,
	editingMessage,
	onCancelEdit,
	onSubmitEdit,
}: MessageFieldProps) {
	const [message, setMessage] = useState('')
	const socket = useSocket()
  const typingTimeout = useRef<NodeJS.Timeout>(null)
	const isTypingRef = useRef(false)

	const sendTypingStatus = useCallback(
		(typing: boolean) => {
			console.log(`Sending typing status: ${typing}`)
			if (!socket.connected) return
			if (isTypingRef.current === typing) return

			socket.emit(ChatClientEvent.TYPING, { chatId, isTyping: typing })
			isTypingRef.current = typing
		},
		[chatId, socket]
	)

	useEffect(() => {
		return () => {
			if (isTypingRef.current) {
				sendTypingStatus(false)
			}
			if (typingTimeout.current) {
				clearTimeout(typingTimeout.current)
			}
		}
	}, [sendTypingStatus])


  const handleInput = () => {
		if (!isTypingRef.current) {
			sendTypingStatus(true)
		}

		if (typingTimeout.current) {
			clearTimeout(typingTimeout.current)
		}

		typingTimeout.current = setTimeout(() => {
			sendTypingStatus(false)
		}, 2000)
	}

	useEffect(() => {
		if (editingMessage) {
			setMessage(editingMessage.content)
		} else {
			setMessage('')
		}
	}, [editingMessage])

	const sendMessage = useCallback(
		(e: FormEvent) => {
			e.preventDefault()
			if (!userId) return
			if (!message.trim()) return

			if (typingTimeout.current) {
				clearTimeout(typingTimeout.current)
			}
			if (isTypingRef.current) {
				sendTypingStatus(false)
			}

			if (editingMessage) {
				onSubmitEdit(editingMessage.id, message)
			} else {
				const messageData = {
					content: message,
					chatId: chatId,
				}
				socket.emit(ChatClientEvent.SEND_MESSAGE, messageData)
				setMessage('')
			}
		},
		[message, chatId, userId, editingMessage, onSubmitEdit]
	)

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			sendMessage(e)
		} else {
			handleInput()
		}
	}

	return (
		<form
			className='p-3 border-t border-border flex space-x-2'
			onSubmit={sendMessage}
			onInput={handleInput}
		>
			<input
				type='text'
				value={message}
				onChange={e => setMessage(e.target.value)}
				className='rounded-lg border placeholder:text-[#585654] flex-1 p-2 focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 break-words whitespace-pre-wrap'
				placeholder={
					editingMessage ? 'Редактирование сообщения...' : 'Сообщение...'
				}
				disabled={!userId}
				onKeyDown={handleKeyDown}
			/>
			{editingMessage ? (
				<>
					<button
						type='button'
						onClick={onCancelEdit}
						className='rounded-lg border px-4 py-2 text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
					>
						Отмена
					</button>
					<button
						type='submit'
						className='cursor-pointer rounded-lg border px-4 py-2 text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 disabled:opacity-50'
						disabled={!userId || !message.trim()}
					>
						Сохранить
					</button>
				</>
			) : (
				<button
					type='submit'
					className='cursor-pointer rounded-lg border px-4 py-2 text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 disabled:opacity-50'
					disabled={!userId || !message.trim()}
				>
					<Send size={18} />
				</button>
			)}
		</form>
	)
}
