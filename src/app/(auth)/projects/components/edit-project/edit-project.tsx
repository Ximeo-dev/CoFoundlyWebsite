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
			const response = await projectService.editProject(data, initialData.id)
			toast.success('Проект успешно обновлен')
			onUpdated(response)
		} catch (error) {
			console.error('Ошибка при обновлении проекта:', error)
			toast.error('Не удалось обновить проект')
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
