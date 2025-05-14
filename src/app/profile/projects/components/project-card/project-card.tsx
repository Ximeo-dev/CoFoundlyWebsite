'use client'

import { IProject } from '@/types/project.types'
import Link from 'next/link'

export default function ProjectCard({ project }: { project: IProject }) {
	return (
		<Link href={`/profile/projects/${project.id}`}>
			1
		</Link>
	)
}
