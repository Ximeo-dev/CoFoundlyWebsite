'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import SkeletonView from '../../components/user-anket/anket-view/skeleton-view'
import { useProjects } from '@/hooks/anket/useProjects'
import ProjectEditor from './project-editor'
import ProjectCardList from './project-card-list/project-card-list'

export default function ProjectMain() {
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)
	const { projects, isLoading, error } = useProjects()

	if (isLoading) return <SkeletonView />

	if (error || !projects || projects.length === 0) {
		return (
			<ProjectEditor
				mode='create'
				onSuccess={createdProject => {
					queryClient.setQueryData(['getProjects'], [createdProject])
					setIsEditing(false)
				}}
			/>
		)
	}

	return (
		<div className='p-6 min-h-[500px]'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-7 text-center'>
				Ваши проекты
			</h2>
			<ProjectCardList projects={projects} />
		</div>
	)
}
