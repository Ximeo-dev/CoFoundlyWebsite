'use client'

import { IProject } from '@/types/project.types'
import ProjectCard from '../project-card/project-card'

export default function ProjectCardList({ projects }: { projects: IProject[] }) {
  if (!projects || projects.length === 0) {
		return (
			<div className='text-center py-6'>
				Проекты отсутствуют
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
			{projects.map(project => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	)
}
