import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAnketRequest, IAnket } from '@/types/anket.types'

class AnketService {
	private BASE_URL = '/profile'

	async createAnket(data: IAnketRequest): Promise<IAnket> {
		const response = await axiosWithAuth.post<IAnket>(this.BASE_URL, data)
		return response.data
	}

	async getAnket(): Promise<IAnket | null> {
		const response = await axiosWithAuth.get<IAnket>(this.BASE_URL)
		return response.data
	}

	async editAnket(data: IAnketRequest): Promise<IAnket> {
		const response = await axiosWithAuth.patch<IAnket>(this.BASE_URL, data)
		return response.data
	}

	async deleteAnket(): Promise<void> {
		await axiosWithAuth.delete(this.BASE_URL)
	}

	async getOtherAnket(userId: string): Promise<IAnket> {
		const response = await axiosWithAuth.get<IAnket>(
			`${this.BASE_URL}/${userId}`
		)
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

	async getAvatarUrl(userId: string, size: 64 | 128 | 512) {
		return `${API_URL}/images/avatar/${userId}/${size}`
	}

	async getProfessional(type: 'language' | 'skill' | 'industry' | 'job', limit?: number) {
		const response = await axiosWithAuth.get(
			`${API_URL}/${type}/autocomplete?limit=${limit}`
		)

		return response.data
	}
}

export const anketService = new AnketService()