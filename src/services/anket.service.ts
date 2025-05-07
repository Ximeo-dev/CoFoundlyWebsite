import { axiosWithAuth } from '@/api/interceptors'
import { IAnketRequest, IAnket } from '@/types/anket.types'

class AnketService {
	private BASE_URL = '/profile'

	async createAnket(data: IAnketRequest): Promise<IAnket> {
		const response = await axiosWithAuth.post<IAnket>(this.BASE_URL, data)
		return response.data
	}

	async getAnket(): Promise<IAnket | null> {
		try {
			const response = await axiosWithAuth.get<IAnket>(this.BASE_URL)
			return response.data
		} catch (error) {
			return null
		}
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
}

export const anketService = new AnketService()