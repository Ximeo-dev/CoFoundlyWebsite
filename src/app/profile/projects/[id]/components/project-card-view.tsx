'use client'

import { IProject } from '@/types/project.types'

interface IProjectCardView {
  project: IProject | null
}

export default function ProjectCardView({ project }: IProjectCardView) {
	return <h1>{project?.name}</h1>
}