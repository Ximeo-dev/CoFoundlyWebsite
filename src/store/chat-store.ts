import { IChat } from '@/types/chat.types'
import { create } from 'zustand'

interface ChatStore {
	chats: IChat[]
	currentChatId: string | null
	setChats: (chats: IChat[]) => void
	setCurrentChatId: (id: string | null) => void
}

export const useChatStore = create<ChatStore>(set => ({
	chats: [],
	currentChatId: null,
	setChats: chats => set({ chats }),
	setCurrentChatId: id => set({ currentChatId: id }),
}))
