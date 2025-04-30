import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
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
			`${this.BASE_URL}/settings/change-email`,
			data
		)
		return response.data
	}

	async emailConfirmation() {
		const response = await axiosWithAuth.post<IUser>(`/send-confirmation`)
		return response.data
	}

	async uploadAvatar(file: File) {
		const formData = new FormData()
		formData.append('avatar', file)

		const response = await axiosWithAuth.post('/images/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		return response.data
	}

	async getAvatarUrl(userId: string, size: '64x64' | '128x128' | '512x512') {
		return `${this.BASE_URL}/images/avatar/${userId}/${size}`
	}
}

export const userService = new UserService()