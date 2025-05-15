'use client'

import { useProjectById } from '@/hooks/anket/useProjectById'
import ProjectCardView from './components/project-card-manage'
import * as React from 'react'
import SkeletonView from '../../components/user-anket/anket-view/skeleton-view'

interface IProjectPage {
	params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: IProjectPage) {
	const resolvedParams = React.use(params)
	const projectId = resolvedParams.id

	const { project, isLoading, error } = useProjectById(projectId)

	if (isLoading) return <SkeletonView />
	if (error) return <div>Ошибка: {error.message}</div>

	return <ProjectCardView project={project} />
}
