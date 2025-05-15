import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IProject, IProjectRequest } from '@/types/project.types'

class ProjectService {
	private BASE_URL = `${API_URL}/profile/project`

	async createProject(data: IProjectRequest): Promise<IProject> {
		const response = await axiosWithAuth.post<IProject>(this.BASE_URL, data)
		return response.data
	}

	async editProject(
		data: IProjectRequest,
		projectId: string
	): Promise<IProject> {
		const response = await axiosWithAuth.patch<IProject>(
			`${this.BASE_URL}/${projectId}`,
			data
		)
		return response.data
	}

	async deleteProject(projectId: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${projectId}`)
		return response.data
	}

	async getUserProjects(): Promise<IProject[]> {
		const response = await axiosWithAuth.get<IProject[]>(this.BASE_URL)
		return response.data
	}

	async getProjectById(projectId: string): Promise<IProject> {
		const response = await axiosWithAuth.get<IProject>(
			`${this.BASE_URL}/${projectId}`
		)
		return response.data
	}
}

export const projectService = new ProjectService()