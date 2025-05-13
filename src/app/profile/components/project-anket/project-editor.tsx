'use client'

import { projectService } from '@/services/project.service'
import { IProject, IProjectRequest } from '@/types/project.types'
import { toast } from 'sonner'
import ProjectForm from '../project-form'

type ProjectEditorMode = 'create' | 'edit'

interface IProjectEditor {
	mode?: ProjectEditorMode
	initialData?: IProject
	onSuccess: (data: IProject) => void
	onCancel?: () => void
}

export default function ProjectEditor({
	mode = 'create',
	initialData,
	onSuccess,
	onCancel,
}: IProjectEditor) {
	const handleSubmit = async (data: IProjectRequest) => {
		try {
			let response: IProject

			if (mode === 'edit') {
				if (!initialData?.id) {
					throw new Error('Project ID is required for editing')
				}
				response = await projectService.editProject(data, initialData.id)
				toast.success('Данные успешно обновлены')
			} else {
				response = await projectService.createProject(data)
				toast.success('Проект успешно создан')
			}

			onSuccess(response)
		} catch (error) {
			console.error(
				`Ошибка при ${mode === 'edit' ? 'обновлении' : 'создании'} проекта:`,
				error
			)
			toast.error(
				`Не удалось ${mode === 'edit' ? 'обновить' : 'создать'} проект`
			)
		}
	}

	return (
		<ProjectForm
			initialValues={initialData}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			mode={mode}
			submitButtonText={
				mode === 'edit' ? 'Сохранить изменения' : 'Создать проект'
			}
		/>
	)
}
