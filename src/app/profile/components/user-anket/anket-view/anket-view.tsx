'use client'

import { Pencil, Trash } from 'lucide-react'
import Avatar from '../../profile-info/avatar'
import { cn } from '@/lib/utils'
import styles from './anket-view.module.css'
import { differenceInYears } from 'date-fns'
import { useMutation, useQuery } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { toast } from 'sonner'
import { useState } from 'react'
import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import Tooltip from '@/components/ui/tooltip/tooltip'
import ScrollIndicator from '@/components/ui/scroll-indicator/scroll-indicator'
import { calculateProgress } from '@/utils/calculateProgress'
import ProgressBar from '@/components/ui/progress-bar/progress-bar'

export default function AnketView({
	anket,
	onEdit,
	editable = false,
	showProgress = true,
}: {
	anket: any
	onEdit?: () => void
	editable?: boolean
	showProgress: boolean
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const progress = calculateProgress({
		name: anket?.name,
		birthDate: anket?.birthDate,
		bio: anket?.bio,
		job: anket?.job,
		skills: anket?.skills,
		languages: anket?.languages,
		industries: anket?.industries,
		portfolio: anket?.portfolio,
	})

	const { mutate: deleteAnket } = useMutation({
		mutationKey: ['anket delete'],
		mutationFn: () => anketService.deleteAnket(),
		onSuccess: () => {
			toast.success('Анкета успешно удалена')
			setIsModalOpen(false)
		},
	})

	const handleAnketDelete = () => {
		deleteAnket()
		window.location.reload()
	}
	
	return (
		<>
			<div className={styles.view_block}>
				<div className={cn(styles.view_inner, `border-b border-border`)}>
					<div className={styles.view_top}>
						<h2 className={styles.view_top_text}>
							{editable ? 'Ваша анкета' : 'Анкета'}
						</h2>

						{showProgress && <ProgressBar progress={progress} />}

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
							<Avatar size={512} />
							<h1 className={styles.personal_data}>
								{anket?.name},{' '}
								{anket?.birthDate
									? differenceInYears(new Date(), new Date(anket?.birthDate))
									: '—'}
							</h1>
						</div>
					</div>

					<div className={styles.info_block_right}>
						<h3 className={styles.right_title}>Информация в анкете</h3>

						<div className={styles.right_inner}>
							<div>
								<p className='text-sm text-muted-foreground'>
									Род деятельности
								</p>
								<p
									className={cn('mt-1', !anket?.job && 'text-muted-foreground')}
								>
									{typeof anket?.job === 'string'
										? anket?.job
										: anket?.job?.name || 'Не указано'}
								</p>
							</div>

							<div>
								<p className='text-sm text-muted-foreground'>О себе</p>
								<p
									className={cn('mt-1', !anket?.bio && 'text-muted-foreground')}
								>
									{anket?.bio || 'Нет описания'}
								</p>
							</div>

							<div>
								<p className='text-sm text-muted-foreground'>Навыки</p>
								<div className='mt-2'>
									{anket?.skills?.length ? (
										<div className='flex flex-wrap gap-x-2 gap-y-3'>
											{anket.skills.map((skill: any) => (
												<span
													key={skill.id || skill}
													className='bg-primary text-white dark:text-black text-sm px-3 py-1 rounded-full'
												>
													{typeof skill === 'string' ? skill : skill.name}
												</span>
											))}
										</div>
									) : (
										<p className='text-muted-foreground'>Нет навыков</p>
									)}
								</div>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Языки</p>
								<div className='mt-2'>
									{anket?.languages?.length ? (
										<div className='flex flex-wrap gap-2'>
											{anket.languages.map((language: any) => (
												<span
													key={language.name}
													className='text-black dark:text-white'
												>
													{typeof language === 'string'
														? language
														: language.name}
												</span>
											))}
										</div>
									) : (
										<p className='text-muted-foreground'>Не выбрано</p>
									)}
								</div>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>
									Интересующие ниши
								</p>
								<div className='mt-2'>
									{anket?.industries?.length ? (
										<div className='flex flex-wrap gap-2'>
											{anket.industries.map((industry: any) => (
												<span
													key={industry.name}
													className='text-black dark:text-white'
												>
													{typeof industry === 'string'
														? industry
														: industry.name}
												</span>
											))}
										</div>
									) : (
										<p className='text-muted-foreground'>Не выбрано</p>
									)}
								</div>
							</div>
							<div>
								<p className='text-sm text-muted-foreground mb-1'>Портфолио</p>
								<a
									href={anket?.portfolio}
									className={cn(
										'mt-1 text-base transition-all duration-500 border-b border-b-foreground dark:hover:border-b-white border-dashed text-foreground hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white',
										!anket?.portfolio && 'text-muted-foreground'
									)}
								>
									{anket?.portfolio || 'Не выбрано'}
								</a>
							</div>
						</div>
					</div>
				</div>
				{!editable && <ScrollIndicator />}
			</div>
			{isModalOpen && (
				<Modal
					className='py-3 px-4'
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<h2 className='text-lg mb-10'>
						Вы действительно хотите удалить анкету?
					</h2>
					<div className='flex justify-end gap-x-4 items-center'>
						<Button onClick={() => setIsModalOpen(false)}>
							Оставить анкету
						</Button>
						<Button variant={'destructive'} onClick={handleAnketDelete}>
							Удалить
						</Button>
					</div>
				</Modal>
			)}
		</>
	)
}
