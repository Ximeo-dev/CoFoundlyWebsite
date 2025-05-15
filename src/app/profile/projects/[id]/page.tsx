'use client'

import { useQueryClient } from '@tanstack/react-query'
import ProjectCardView from './components/project-card-manage'
import * as React from 'react'
import SkeletonView from '../../components/user-anket/anket-view/skeleton-view'
import { useProjectById } from '@/hooks/anket/useProjectById'
import { IProject } from '@/types/project.types'

interface IProjectPage {
	params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: IProjectPage) {
	const resolvedParams = React.use(params)
	const projectId = resolvedParams.id
	const queryClient = useQueryClient()

	const { project, isLoading, error } = useProjectById(projectId)

	if (isLoading) return <SkeletonView />
	if (error) return <div>Ошибка: {error.message}</div>

	const handleUpdate = (updatedProject: IProject) => {
		queryClient.setQueryData(['getProjectById', projectId], updatedProject)
		queryClient.setQueryData(
			['getProjects'],
			(oldData: IProject[] | undefined) =>
				oldData
					? oldData.map(p => (p.id === projectId ? updatedProject : p))
					: oldData
		)
	}

	return <ProjectCardView project={project} onUpdate={handleUpdate} />
}
