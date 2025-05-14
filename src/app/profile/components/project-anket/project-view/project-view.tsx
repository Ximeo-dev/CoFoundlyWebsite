'use client'

import { IProject } from '@/types/project.types'

interface ProjectViewProps {
	project: IProject
}

export default function ProjectView({ project }: ProjectViewProps) {
	return (
		<div className='h-[600px]'>
			<div className='h-[100px] w-full border-b border-border'>Top</div>
			<div
				className='grid p-5'
				style={{
					gridTemplateColumns: '0.45fr 1fr',
				}}
			>
				{project.id}
				<div className='bg-[#cbacf9]'>Sidebar</div>
				<div className='pl-3'>Main</div>
			</div>
		</div>
	)
}
