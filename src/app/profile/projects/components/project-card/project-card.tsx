'use client'

import { useAuth } from '@/hooks/useAuth'
import { IProject } from '@/types/project.types'
import Link from 'next/link'

export default function ProjectCard({ project }: { project: IProject }) {
	const { user } = useAuth()

	return (
		<div className='group rounded-[15px] border border-border p-4 shadow-xs hover:shadow-neutral-700 transition-all duration-300 bg-background'>
			<div className='w-full flex items-center justify-center'>
				<div className='relative w-1/2 h-32 rounded-md overflow-hidden mb-7 border border-border' />
			</div>

			<h3 className='text-2xl font-semibold text-neutral-800 dark:text-white mb-1'>
				{project.name}
			</h3>

			<p className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2'>
				{project.description || 'Описание отсутствует'}
			</p>

			<div className='flex justify-between items-center mt-7'>
				<Link
					href={`/profile/projects/${project.id}/preview`}
					className='text-sm transition-colors duration-300 ease-linear border-b border-b-foreground dark:hover:border-b-white border-dashed text-foreground hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'
				>
					Предпросмотр →
				</Link>
				<button disabled={project.ownerId === user?.id}>
					<Link
						href={`/profile/projects/${project.id}`}
						className='px-3 py-2 text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black transition hover:opacity-90'
					>
						Управление
					</Link>
				</button>
			</div>
		</div>
	)
}
