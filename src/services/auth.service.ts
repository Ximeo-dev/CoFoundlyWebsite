import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAuthForm, IAuthResponse, IConfirmPassword, ILoginForm } from '@/types/auth.types'
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

	async checkEmailAvailability(email: string) {
		const response = await axiosClassic.get(
			`${this.BASE_URL}/register/email-available`,
			{
				params: { email },
			}
		)

		return response.data
	}

	async resetPasswordRequest(email: string) {
		const response = axiosClassic.post(`${this.BASE_URL}/reset-password`, { email })

		return response
	}

	async resetPasswordConfirm(password: string, token: string) {
		const response = await axiosClassic.post<IConfirmPassword>(
			`${this.BASE_URL}/reset-password/confirm`,
			{ password },
			{
				params: { token },
			}
		)
		return response
	}

	async twoFactorBind(token: string) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/2fa-bind`,
			{
				params: { token }
			}
		)

		return response
	}
}

export const authService = new AuthService()