import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import {
	IAuthForm,
	IAuthResponse,
	IConfirmPassword,
	ILoginForm,
} from '@/types/auth.types'
import {
	removeAccessTokenFromStorage,
	saveAccessTokenToStorage,
} from './auth-token.services'
import { IChangeEmailDto } from '@/types/change.types'

class SecurityService {
	private BASE_URL = `${API_URL}/security`

	async changeEmailRequest(data: IChangeEmailDto) {
		const response = await axiosWithAuth.post<{ message: string }>(
			`${this.BASE_URL}/change-email`,
			data
		)
		return response.data
	}

	async resetPasswordRequest(email: string) {
		const response = axiosClassic.post(`${this.BASE_URL}/reset-password`, {
			email,
		})

		return response
	}

	async resetPasswordConfirm(password: string, token: string, userId: string) {
		const response = await axiosClassic.post<IConfirmPassword>(
			`${this.BASE_URL}/reset-password/confirm`,
			{ password },
			{
				params: { token, userId },
			}
		)
		return response
	}
}

export const securityService = new SecurityService()
