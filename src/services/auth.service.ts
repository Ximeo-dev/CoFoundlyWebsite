import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAuthForm, IAuthResponse, ILoginForm } from '@/types/auth.types'
import { removeAccessTokenFromStorage, saveAccessTokenToStorage } from './auth-token.services'

class AuthService {
	private BASE_URL = `${API_URL}/auth`

	async login(data: ILoginForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/login`,
			{
				...data,
			}
		)

		if (response.data.accessToken)
			saveAccessTokenToStorage(response.data.accessToken)

		return response
	}

	async register(data: IAuthForm): Promise<IAuthResponse> {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/register`,
			data
		)

		if (response.data.accessToken)
			saveAccessTokenToStorage(response.data.accessToken)

		return response.data
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/login/access-token`
		)

		if (response.data.accessToken)
			saveAccessTokenToStorage(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await axiosWithAuth.post<boolean>(
			`${this.BASE_URL}/logout`
		)

		if (response.data) removeAccessTokenFromStorage()

		return response
	}

	async logoutEverywhere() {
		const response = await axiosWithAuth.post<boolean>(
			`${this.BASE_URL}/logout-everywhere`
		)

		if (response.data) removeAccessTokenFromStorage()

		return response
	}

	async checkAvailability(type: 'email' | 'username', value: string) {
		const response = await axiosClassic.get(
			`${this.BASE_URL}/register/${type}-available`,
			{
				params: { [type]: value },
			}
		)

		return response.data
	}
}

export const authService = new AuthService()