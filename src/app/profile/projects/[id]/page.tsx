import type { Metadata } from 'next'
import { projectService } from '@/services/project.service'
import ProjectCardView from './components/project-card-view'

interface IProjectPage {
  params: { name: string }
}

export async function generateMetadata({ params }: IProjectPage): Promise<Metadata> {
	const project = await projectService.getProjectById(params.name)
  
	return {
		title: project?.name || 'Проект',
	}
}

export default async function ProjectPage({ params }: IProjectPage) {
  const project = await projectService.getProjectById(params.name)

  return <ProjectCardView project={project} />
}
