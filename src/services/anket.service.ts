import { axiosWithAuth } from '@/api/interceptors'
import { IAnketRequest, IAnket } from '@/types/anket.types'

class AnketService {
	async createAnket(data: IAnketRequest): Promise<IAnket> {
		const response = await axiosWithAuth.post<IAnket>('/profile', data)
		return response.data
	}

	async getAnket(): Promise<any | null> {
		const response = await axiosWithAuth.get<IAnket | null>('/profile')
		return response.data
	}

	async editAnket(data: IAnketRequest): Promise<IAnket> {
		const response = await axiosWithAuth.patch<IAnket>('/profile', data)
		return response.data
	}

	async deleteAnket(): Promise<{ message: string }> {
		const response = await axiosWithAuth.delete<{ message: string }>('/profile')
		return response.data
	}

	async getOtherAnket(userId: string): Promise<IAnket | null> {
		const response = await axiosWithAuth.get<IAnket | null>(
			`/profile/${userId}`
		)
		return response.data
	}
}

export const anketService = new AnketService()
