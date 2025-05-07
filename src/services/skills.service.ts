import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'

export class SkillsService {
	private BASE_URL = `${API_URL}/skills`

	async getSkills(limit: number) {
		const response = await axiosWithAuth.get(
			`${this.BASE_URL}/autocomplete?limit=${limit}`
		)

		return response.data
	}

	async testGetSkills(q: string = '') {
		const response = await axiosWithAuth.get(
			`${this.BASE_URL}/autocomplete?q=${encodeURIComponent(
				q
			)}`
		)
		return response.data
	}
}

export const skillsService = new SkillsService()