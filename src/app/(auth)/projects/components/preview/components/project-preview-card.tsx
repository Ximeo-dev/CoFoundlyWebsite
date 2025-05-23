'use client'

import { IProject } from '@/types/project.types'
import styles from './project-preview-card.module.css'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { projectService } from '@/services/project.service'
import { toast } from 'sonner'
import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import Tooltip from '@/components/ui/tooltip/tooltip'
import TwoFA from '@/components/ui/2fa/2fa'
import { ResponseError } from '@/types/error.types'
import ProjectAvatar from '@/components/ui/project-avatar/project-avatar'

export default function ProjectPreviewCard({
	project,
	editable = false,
	onEdit,
	onDelete,
}: {
	project: IProject | any
	editable?: boolean
	onEdit?: () => void
	onDelete?: () => void
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isBotModalOpen, setIsBotModalOpen] = useState(false)

	const { mutate: deleteProject } = useMutation({
		mutationKey: ['project delete', project.id],
		mutationFn: () => projectService.removeProject(project.id),
		onSuccess: () => {
			toast.success('Проект успешно удален')
			setIsModalOpen(false)
			onDelete?.()
		},
		onError: (error: ResponseError | any) => {
			if (error.status === 403) {
				toast.error('Требуется подтверждение 2FA')
			} else {
				toast.error(error?.response?.data?.message)
			}
		},
	})

	const handleDeleteProject = () => {
		setIsBotModalOpen(true)
		setIsModalOpen(false)
		deleteProject()
	}

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
						<h2 className={styles.view_top_text}>
							{editable ? 'Ваш проект' : 'Проект'}
						</h2>
						{editable && (
							<div className='flex items-center gap-x-5'>
								<button
									onClick={onEdit}
									className='text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer inline-flex items-center'
									aria-label='Редактировать'
								>
									<Tooltip text='Редактировать' position='bottom'>
										<Pencil className='w-5 h-5' />
									</Tooltip>
								</button>
								<button
									onClick={() => setIsModalOpen(true)}
									className='text-muted-foreground hover:text-rose-500 transition-colors duration-300 cursor-pointer inline-flex items-center'
								>
									<Tooltip text='Удалить' position='bottom'>
										<Trash className='w-5 h-5' />
									</Tooltip>
								</button>
							</div>
						)}
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
							<ProjectAvatar
								size={512}
								projectName={project.name || 'Новый проект'}
								className='shrink-0 mb-5'
							/>
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
									{project.description || 'Не указано'}
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
										!industryName && 'text-muted-foreground'
									)}
								>
									{industryName || 'Не указано'}
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
											{project.jobs.map((job: any, i: number) => (
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
									{project.skills?.length ? (
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
									{project.languages?.length ? (
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
			{isModalOpen && (
				<Modal
					className='py-3 px-4'
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<h2 className='text-lg mb-10'>
						Вы действительно хотите удалить проект?
					</h2>
					<div className='flex justify-end gap-x-4 items-center'>
						<Button onClick={() => setIsModalOpen(false)}>
							Оставить проект
						</Button>
						<Button variant='destructive' onClick={handleDeleteProject}>
							Удалить
						</Button>
					</div>
				</Modal>
			)}
			{isBotModalOpen && (
				<TwoFA
					isOpen={isBotModalOpen}
					onClose={() => setIsBotModalOpen(false)}
				/>
			)}
		</LazyMotion>
	)
}
