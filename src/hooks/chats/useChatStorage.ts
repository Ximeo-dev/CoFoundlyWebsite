import { useEffect } from 'react'

const ACTIVE_CHAT_KEY = 'activeChatId'

export default function useChatStorage (chatId: string) {
	useEffect(() => {
		localStorage.setItem(ACTIVE_CHAT_KEY, chatId)
		return () => {
			localStorage.removeItem(ACTIVE_CHAT_KEY)
		}
	}, [chatId])
}
