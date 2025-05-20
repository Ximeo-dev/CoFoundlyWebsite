'use client'

import { useProjectById } from '@/hooks/anket/useProjectById'
import * as React from 'react'
import ProjectPreviewCard from './components/project-preview-card'

interface IPreviewPage {
	params: Promise<{ id: string }>
}

export default function ProjectPreviewPage({ params }: IPreviewPage) {
	const resolvedParams = React.use(params)
	const projectId = resolvedParams.id
	const { project, isLoading, error } = useProjectById(projectId)

	if (isLoading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка: {error.message}</div>

	return <ProjectPreviewCard project={project} />
}
