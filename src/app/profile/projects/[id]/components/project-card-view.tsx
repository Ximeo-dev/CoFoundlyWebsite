'use client'

import { IProject } from '@/types/project.types'

interface IProjectCardView {
  project: IProject | any
}

export default function ProjectCardView({ project }: IProjectCardView) {
  if (!project) {
    return <p>fdf</p>
  }
  
	return <h1>{project?.name}</h1>
}