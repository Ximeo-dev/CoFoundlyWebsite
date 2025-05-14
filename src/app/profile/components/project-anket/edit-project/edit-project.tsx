'use client'

import { toast } from 'sonner'
import ProjectForm from '../../project-form'
import { IProject, IProjectRequest } from '@/types/project.types'
import { projectService } from '@/services/project.service'
import { useProjects } from '@/hooks/anket/useProjects'
import { useProjectById } from '@/hooks/anket/useProjectById'

interface IEditAnket {
  initialData: IProject
  onUpdated: (updated: IProject) => void
}

export default function EditProject({ initialData, onUpdated }: IEditAnket) {
  const { projects } = useProjects()
  const { project } = useProjectById(projects[0]?.id || '')
	const handleSubmit = async (data: IProjectRequest) => {
		try {
			const response = await projectService.editProject(data, project?.id || '')
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
		/>
	)
}
