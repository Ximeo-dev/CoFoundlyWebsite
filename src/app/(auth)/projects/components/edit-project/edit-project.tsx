'use client'

import { toast } from 'sonner'
import ProjectForm from '../../../components/project-form'
import { IProject, IProjectRequest } from '@/types/project.types'
import { projectService } from '@/services/project.service'

interface IEditProject {
	initialData: IProject
	onUpdated: (updated: IProject) => void
	onCancel: () => void
}

export default function EditProject({
	initialData,
	onUpdated,
	onCancel,
}: IEditProject) {
	const handleSubmit = async (data: IProjectRequest) => {
		try {
			if (!initialData.id) {
				console.error('[EditProject] Missing project ID:', initialData)
				throw new Error('Project ID is missing')
			}
			console.log(
				'[EditProject] Submitting data for project ID:',
				initialData.id
			)
			console.log('[EditProject] Data:', JSON.stringify(data, null, 2))
			const response = await projectService.editProject(data, initialData.id)
			console.log('[EditProject] Success response:', response)
			toast.success('Проект успешно обновлен')
			onUpdated(response)
		} catch (error: any) {
			console.error('[EditProject] Error updating project:', {
				message: error.message,
				status: error.response?.status,
				data: error.response?.data,
				stack: error.stack,
			})
			toast.error(error.response?.data?.message || 'Не удалось обновить проект')
		}
	}

	return (
		<ProjectForm
			initialValues={initialData}
			onSubmit={handleSubmit}
			submitButtonText='Сохранить изменения'
			onCancel={onCancel}
			mode='edit'
		/>
	)
}
