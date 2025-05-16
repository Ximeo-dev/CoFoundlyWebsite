import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IChat, IMessages } from '@/types/chat.types'

class ChatService {
	private BASE_URL = `${API_URL}/chat`

	async getChats(searchTerm: string = ''): Promise<IChat[]> {
		const response = await axiosWithAuth.get<IChat[]>(this.BASE_URL, {
			params: { search: searchTerm },
		})
		return response.data
	}

	async getChatMessages(chatId: string) {
		const response = await axiosWithAuth.get<IMessages[]>(
			`${this.BASE_URL}/${chatId}/messages`,
			{
				params: { page: 1, limit: 30 },
			}
		)
		return response.data
	}
}

export const chatService = new ChatService()