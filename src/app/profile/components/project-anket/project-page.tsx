'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import SkeletonView from '../user-anket/anket-view/skeleton-view'
import { useProjects } from '@/hooks/anket/useProjects'
import ProjectEditor from './project-editor'
import ProjectView from './project-view/project-view'

export default function ProjectPage() {
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

	return isEditing ? (
		<ProjectEditor
			onCancel={() => setIsEditing(false)}
			mode='edit'
			initialData={projects[0]}
			onSuccess={updatedProject => {
				queryClient.setQueryData(['getProjects'], [updatedProject])
				setIsEditing(false)
			}}
		/>
	) : (
		<ProjectView project={projects[0]} />
	)
}
