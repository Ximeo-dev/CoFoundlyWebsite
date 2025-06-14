'use client'

import { toast } from 'sonner'
import { projectService } from '@/services/project.service'
import { IProjectRequest } from '@/types/project.types'
import ProjectForm from '../../../components/project-form'

export default function CreateProject({
	onCreated,
	onCancel,
}: {
	onCreated: (created: any) => void
	onCancel?: () => void
}) {
	const handleSubmit = async (data: IProjectRequest) => {
		try {
			const response = await projectService.createProject(data)
			toast.success('Проект успешно создан')
			onCreated(response)
		} catch {
			toast.error('Ошибка при создании проекта')
		}
	}

	return <ProjectForm onSubmit={handleSubmit} onCancel={onCancel} />
}
