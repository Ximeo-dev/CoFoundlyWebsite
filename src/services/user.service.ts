import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IChangeEmailDto, IChangePasswordDto } from '@/types/change.types'
import { IUser } from '@/types/user.types'

class UserService {
	private BASE_URL = `${API_URL}/user`

	async getUserProfile() {
		const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
		if (!response.data) {
			throw new Error('Профиль пользователя не найден')
		}
		return response.data
	}

	async changePassword(data: IChangePasswordDto) {
		const response = await axiosWithAuth.patch<IUser>(
			`${this.BASE_URL}/settings/change-password`,
			data
		)
		return response.data
	}

	async changeEmail(data: IChangeEmailDto) {
		const response = await axiosWithAuth.patch<IUser>(
			`${this.BASE_URL}/security/change-email`,
			data
		)
		return response.data
	}

	async emailConfirmation() {
		const response = await axiosWithAuth.post<IUser>(
			`/security/send-confirmation`
		)
		return response.data
	}
}

export const userService = new UserService()