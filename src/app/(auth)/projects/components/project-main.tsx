'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import SkeletonView from '../../components/user-anket/anket-view/skeleton-view'
import { useProjects } from '@/hooks/anket/useProjects'
import ProjectEditor from './project-editor'
import ProjectPreviewCard from './preview/components/project-preview-card'
import { IProject } from '@/types/project.types'

export default function ProjectMain() {
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)
	const { projects, isLoading } = useProjects()

	if (isLoading) return <SkeletonView />

	const project = projects && projects.length > 0 ? projects[0] : null

	if (project) {
		return isEditing ? (
			<ProjectEditor
				onCancel={() => setIsEditing(false)}
				mode='edit'
				initialData={project}
				onSuccess={updatedProject => {
					queryClient.setQueryData(
						['getProjects'],
						(old: IProject[] | undefined) =>
							old
								? old.map(p =>
										p.id === updatedProject.id ? updatedProject : p
								  )
								: [updatedProject]
					)
					setIsEditing(false)
				}}
			/>
		) : (
			<ProjectPreviewCard
				project={project}
				editable
				onEdit={() => setIsEditing(true)}
				onDelete={() => {
					queryClient.setQueryData(
						['getProjects'],
						(old: IProject[] | undefined) =>
							old ? old.filter(p => p.id !== project.id) : []
					)
				}}
			/>
		)
	}

	return (
		<ProjectEditor
			mode='create'
			onSuccess={createdProject => {
				queryClient.setQueryData(
					['getProjects'],
					(old: IProject[] | undefined) => [createdProject, ...(old || [])]
				)
				setIsEditing(false)
			}}
		/>
	)
}
