'use client'

import Tooltip from '@/components/ui/tooltip/tooltip'
import { IProject } from '@/types/project.types'
import { Edit, Pencil } from 'lucide-react'

interface ProjectCardHeaderProps {
	project: IProject | any
	isEditing: boolean
	setIsEditing: (value: boolean) => void
}

export default function ProjectCardHeader({
	project,
	isEditing,
	setIsEditing,
}: ProjectCardHeaderProps) {
	return (
		<div className='p-5 border-b border-border flex items-center justify-between'>
			{/* <ProgressBar /> */}
			<div className='flex items-center justify-center w-full'>
				<h1 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-center'>
					{project.name || 'Без названия'}
				</h1>
			</div>
			<div className='flex items-center gap-x-5'>
				<button
					onClick={() => setIsEditing(true)}
					className='text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer inline-flex items-center'
					aria-label='Редактировать'
				>
					<Tooltip text='Редактировать' position='bottom'>
						<Pencil className='w-5 h-5' />
					</Tooltip>
				</button>
			</div>
		</div>
	)
}