'use client'

import { IProject } from '@/types/project.types'
import ProjectCardHeader from './project-card-header'
import ProjectCardSidebar from './sidebar/project-card-sidebar'
import { useState } from 'react'
import EditProject from '../../components/edit-project/edit-project'

interface IProjectCardView {
	project: IProject | any
	onUpdate?: (updatedProject: IProject) => void
}

export default function ProjectCardManage({
	project,
	onUpdate,
}: IProjectCardView) {
	if (!project) {
		return <p>Проект не найден</p>
	}

	const [activeTab, setActiveTab] = useState<'participants' | 'settings'>(
		'participants'
	)
	const [isEditing, setIsEditing] = useState(false)

	const handleUpdate = (updatedProject: IProject) => {
		setIsEditing(false)
		if (onUpdate) onUpdate(updatedProject)
	}

	const handleCancel = () => {
		setIsEditing(false)
	}

	return isEditing ? (
		<EditProject
			initialData={project}
			onUpdated={handleUpdate}
			onCancel={handleCancel}
		/>
	) : (
		<div className='bg-background border border-border rounded-[15px]'>
			<ProjectCardHeader
				project={project}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
			/>
			<div
				className='grid'
				style={{
					gridTemplateColumns: '0.45fr 1fr',
				}}
			>
				<ProjectCardSidebar onTabChange={setActiveTab} />
				{activeTab === 'participants' && <p>participants</p>}
				{activeTab === 'settings' && <p>settings</p>}
			</div>
		</div>
	)
}
