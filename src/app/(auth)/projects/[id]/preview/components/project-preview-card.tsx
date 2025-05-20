'use client'

import { IProject } from '@/types/project.types'
import styles from './project-preview-card.module.css'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ProjectPreviewCard({ project }: { project: IProject | any }) {
  const textVariants = {
		initial: { x: 15, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	}

  const industryName =
		typeof project.industry === 'string'
			? project.industry
			: project.industry?.name

	return (
		<LazyMotion features={domAnimation}>
			<div
				className={cn(
					styles.view_block,
					'bg-background border border-border rounded-[15px]'
				)}
			>
				<div className={cn(styles.view_inner, 'border-b border-border')}>
					<div className={styles.view_top}>
						<h2 className={styles.view_top_text}>Проект</h2>
					</div>
				</div>
				<div className={styles.info_block}>
					<div
						className={cn(
							styles.info_block_left,
							'border-b md:border-b-0 md:border-r border-border'
						)}
					>
						<div className={styles.left_block_inner}>
							{/* <Avatar key={id} id={id} size={512} name={anket.name} /> */}
							<div className='relative w-1/2 h-32 rounded-md overflow-hidden mb-7 border border-border' />
							<m.h1
								variants={textVariants}
								initial='initial'
								animate='animate'
								transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
								className={styles.project_name}
							>
								{project.name}
							</m.h1>
						</div>
					</div>
					<div className={styles.info_block_right}>
						<m.h3
							variants={textVariants}
							initial='initial'
							animate='animate'
							transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
							className={styles.right_title}
						>
							Информация о проекте
						</m.h3>
						<div className={styles.right_inner}>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
									className='text-sm text-muted-foreground'
								>
									О проекте
								</m.p>
								<m.span
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.33 }}
									className={cn(
										'mt-1',
										!project?.description && 'text-muted-foreground'
									)}
								>
									{project.description}
								</m.span>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.35 }}
									className='text-sm text-muted-foreground'
								>
									Направление проекта
								</m.p>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.38 }}
									className={cn(
										'mt-1',
										!project?.industry && 'text-muted-foreground'
									)}
								>
									{industryName}
								</m.p>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.45 }}
									className='text-sm text-muted-foreground'
								>
									Работы, задействованные в проекте
								</m.p>
								<div className='mt-2'>
									{project.jobs?.length ? (
										<div className='flex flex-wrap gap-2'>
											{project.jobs?.map((job: any, i: number) => (
												<m.span
													key={i}
													variants={textVariants}
													initial='initial'
													animate='animate'
													transition={{
														duration: 0.3,
														ease: 'easeOut',
														delay: 0.48,
													}}
													className='text-black dark:text-white'
												>
													{typeof job === 'string' ? job : job.name}
													{i < project?.jobs?.length - 1 && ', '}
												</m.span>
											))}
										</div>
									) : (
										<m.p
											variants={textVariants}
											initial='initial'
											animate='animate'
											transition={{
												duration: 0.3,
												ease: 'easeOut',
												delay: 0.48,
											}}
											className='text-muted-foreground'
										>
											Не указано
										</m.p>
									)}
								</div>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
									className='text-sm text-muted-foreground'
								>
									Навыки, необходимые для проекта
								</m.p>
								<div className='mt-2'>
									{project?.skills?.length ? (
										<div className='flex flex-wrap gap-x-2 gap-y-3'>
											{project.skills.map((skill: any, i: number) => (
												<m.span
													key={i}
													variants={textVariants}
													initial='initial'
													animate='animate'
													transition={{
														duration: 0.3,
														ease: 'easeOut',
														delay: 0.43,
													}}
													className='bg-primary text-white dark:text-black text-sm px-3 py-1 rounded-full'
												>
													{typeof skill === 'string' ? skill : skill.name}
												</m.span>
											))}
										</div>
									) : (
										<m.p
											variants={textVariants}
											initial='initial'
											animate='animate'
											transition={{
												duration: 0.3,
												ease: 'easeOut',
												delay: 0.43,
											}}
											className='text-muted-foreground'
										>
											Не указано
										</m.p>
									)}
								</div>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.45 }}
									className='text-sm text-muted-foreground'
								>
									Языки общения
								</m.p>
								<div className='mt-2'>
									{project?.languages?.length ? (
										<div className='flex flex-wrap gap-2'>
											{project.languages.map((language: any, i: number) => (
												<m.span
													key={i}
													variants={textVariants}
													initial='initial'
													animate='animate'
													transition={{
														duration: 0.3,
														ease: 'easeOut',
														delay: 0.48,
													}}
													className='text-black dark:text-white'
												>
													{typeof language === 'string'
														? language
														: language.name}
													{i < project?.languages?.length - 1 && ', '}
												</m.span>
											))}
										</div>
									) : (
										<m.p
											variants={textVariants}
											initial='initial'
											animate='animate'
											transition={{
												duration: 0.3,
												ease: 'easeOut',
												delay: 0.48,
											}}
											className='text-muted-foreground'
										>
											Не указано
										</m.p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LazyMotion>
	)
}