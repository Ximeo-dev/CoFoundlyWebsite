'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import SkeletonView from '../../components/user-anket/anket-view/skeleton-view'
import { useProjects } from '@/hooks/anket/useProjects'
import ProjectEditor from './project-editor'
import ProjectCardList from './project-card-list/project-card-list'

export default function ProjectMain() {
	const queryClient = useQueryClient()
	const [isCreating, setIsCreating] = useState(false)
	const { projects, isLoading, error } = useProjects()

	if (isLoading) return <SkeletonView />

	if (error || !projects || projects.length === 0 || isCreating) {
		return (
			<ProjectEditor
				mode='create'
				onSuccess={createdProject => {
					queryClient.setQueryData(
						['getProjects'],
						[createdProject, ...(projects || [])]
					)
					setIsCreating(false)
				}}
				onCancel={() => setIsCreating(false)}
			/>
		)
	}

	return (
		<div className=''>
			<h2 className='text-2xl md:text-3xl font-semibold mb-12 text-center'>
				Ваши проекты
			</h2>
			<ProjectCardList projects={projects} />
		</div>
	)
}
