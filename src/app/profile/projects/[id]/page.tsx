'use client'

import { useProjectById } from '@/hooks/anket/useProjectById'
import ProjectCardView from './components/project-card-view'
import * as React from 'react'

interface IProjectPage {
	params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: IProjectPage) {
	const resolvedParams = React.use(params)
	const projectId = resolvedParams.id

	const { project, isLoading, error } = useProjectById(projectId)

	if (isLoading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка: {error.message}</div>

	return <ProjectCardView project={project} />
}
