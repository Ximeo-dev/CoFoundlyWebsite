'use client'

import { toast } from 'sonner'
import { projectService } from '@/services/project.service'
import { IProjectRequest } from '@/types/project.types'
import ProjectForm from '../../../components/project-form'

export default function CreateProject({
  onCreated,
}: {
  onCreated: (created: any) => void
}) {

  const handleSubmit = async (data: IProjectRequest) => {
    console.log('with', data)
    try {
      const response = await projectService.createProject(data)
      toast.success('Проект успешно создан')
      onCreated(response)
    } catch {
      toast.error('Ошибка при создании проекта')
    }
  }

  return <ProjectForm onSubmit={handleSubmit} />
}
