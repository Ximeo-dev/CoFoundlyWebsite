import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'

class SwipeService {
	private BASE_URL = `${API_URL}/swipe`

	async swipeUsers(intent: 'similar' | 'complement') {
		const response = await axiosWithAuth.get(`${this.BASE_URL}?intent=${intent}`)
		return response.data
	}

  async swipeAction(userId: string, action: 'like' | 'skip') {
		const response = await axiosWithAuth.post(this.BASE_URL, {
			userId,
			action,
		})
		return response.data
	}
}

export const swipeService = new SwipeService()