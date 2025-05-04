import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'

class TwoFactorService {
	private BASE_URL = `${API_URL}/2fa`

	async twoFactorBind() {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/bind`)

		return response
	}

	async twoFactorUnbind() {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/unbind`)

		return response
	}
}

export const twoFactorService = new TwoFactorService()