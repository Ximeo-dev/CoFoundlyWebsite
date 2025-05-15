'use client'

import { IProject } from '@/types/project.types'

export default function ProjectCardHeader({ project }: { project: IProject }) {
  return (
		<div className='p-5 border-b border-border'>
			<h1 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-center'>{project.name || 'Без названия'}</h1>
			<p className='text-gray-400 mt-2'>
				{project.description || 'На фоне то что стоит на аве проекта'}
			</p>
      {project?.industry?.name}
		</div>
	)
}