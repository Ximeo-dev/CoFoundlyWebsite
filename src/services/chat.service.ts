import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IChat, IMessage } from '@/types/chat.types'

class ChatService {
	private BASE_URL = `${API_URL}/chat`

	async getChats() {
		const response = await axiosWithAuth.get<IChat[]>(this.BASE_URL)
		return response.data
	}

	async getChatMessages(chatId: string, page: number = 1, limit: number = 30) {
		const response = await axiosWithAuth.get<IMessage[]>(
			`${this.BASE_URL}/${chatId}/messages`,
			{
				params: { page, limit },
			}
		)
		return response.data
	}
}

export const chatService = new ChatService()
