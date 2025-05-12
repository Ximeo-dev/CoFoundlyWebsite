import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAnket } from '@/types/anket.types'
import { ISwipeActionResponse } from '@/types/swipe.types'

class SwipeService {
	private BASE_URL = `${API_URL}/swipe`

	async swipeUsers(intent: 'similar' | 'complement') {
		const response = await axiosWithAuth.get<IAnket>(
			`${this.BASE_URL}?intent=${intent}`
		)
		return response.data
	}

	async swipeAction(toUserId: string, action: 'like' | 'skip') {
		const response = await axiosWithAuth.post<ISwipeActionResponse>(
			this.BASE_URL,
			{
				toUserId,
				action,
			}
		)
		return response.data
	}
}

export const swipeService = new SwipeService()