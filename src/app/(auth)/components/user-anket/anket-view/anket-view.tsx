'use client'

import { domAnimation, LazyMotion, m } from 'framer-motion'
import { Handshake, Pencil, Trash, X } from 'lucide-react'
import Avatar from '../../profile-info/avatar'
import { cn } from '@/lib/utils'
import styles from './anket-view.module.css'
import { differenceInYears } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { toast } from 'sonner'
import { useState } from 'react'
import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import Tooltip from '@/components/ui/tooltip/tooltip'
import ScrollIndicator from '@/components/ui/scroll-indicator/scroll-indicator'
import { calculateProgress } from '@/utils/calculateProgress'
import ProgressBar from '@/components/ui/progress-bar/progress-bar'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/shadcn/select'
import { ResponseError } from '@/types/error.types'
import TwoFA from '@/components/ui/2fa/2fa'

export default function AnketView({
	anket,
	onEdit,
	editable = false,
	showProgress = true,
	id,
	intent,
	handleIntentChange,
	handleSwipeAction,
}: {
	anket: any
	onEdit?: () => void
	editable?: boolean
	showProgress?: boolean
	id?: string
	intent?: 'similar' | 'complement'
	handleIntentChange?: (value: 'similar' | 'complement') => void
	handleSwipeAction?: (action: 'skip' | 'like') => void
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isBotModalOpen, setIsBotModalOpen] = useState(false)

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
			window.location.reload()
		},
		onError: (error: ResponseError | any) => {
			if (error.status === 403) {
				toast.error('Требуется подтверждение 2FA')
			} else {
				toast.error(error?.response?.data?.message)
			}
		},
	})

	const handleDeleteAnket = () => {
		setIsBotModalOpen(true)
		setIsModalOpen(false)
		deleteAnket()
	}


	const displayAge =
		anket?.age !== undefined && anket?.age !== null
			? anket.age
			: anket?.birthDate
			? differenceInYears(new Date(), new Date(anket.birthDate))
			: '—'

	const textVariants = {
		initial: { x: 15, opacity: 0, },
		animate: { x: 0, opacity: 1 },
	}

	return (
		<LazyMotion features={domAnimation}>
			<div
				key={id}
				className={cn(
					styles.view_block,
					'bg-background border border-border rounded-[15px]'
				)}
			>
				{' '}
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
						{!editable && (
							<Select onValueChange={handleIntentChange} value={intent}>
								<SelectTrigger className='w-[200px]'>
									<SelectValue placeholder='Выберите тип поиска' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem className='cursor-pointer' value='similar'>
										Схожие
									</SelectItem>
									<SelectItem className='cursor-pointer' value='complement'>
										Дополняющие
									</SelectItem>
								</SelectContent>
							</Select>
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
							<Avatar key={id} id={id} size={512} name={anket.name} hasAvatar />
							<m.h1
								variants={textVariants}
								initial='initial'
								animate='animate'
								transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
								className={styles.personal_data}
							>
								{anket?.name}, {displayAge}
							</m.h1>
						</div>
						{!editable && (
							<div className='flex justify-between mt-12 md:mt-24'>
								<button
									className='bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 px-3 py-2 rounded-lg cursor-pointer hover:-translate-y-0.5 transition-transform duration-300'
									onClick={() => handleSwipeAction?.('skip')}
									disabled={!handleSwipeAction}
								>
									<span className='flex items-center gap-x-2'>
										<X size={23} />
										<span>Пропустить</span>
									</span>
								</button>
								<button
									className='bg-black dark:bg-white rounded-lg text-white dark:text-black px-3 py-2 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300'
									onClick={() => handleSwipeAction?.('like')}
									disabled={!handleSwipeAction}
								>
									<span className='flex items-center gap-x-2'>
										<Handshake size={23} />
										<span>Лайк</span>
									</span>
								</button>
							</div>
						)}
					</div>

					<div className={styles.info_block_right}>
						<m.h3
							variants={textVariants}
							initial='initial'
							animate='animate'
							transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
							className={styles.right_title}
						>
							Информация в анкете
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
									Род деятельности
								</m.p>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.33 }}
									className={cn('mt-1', !anket?.job && 'text-muted-foreground')}
								>
									{typeof anket?.job === 'string'
										? anket?.job
										: anket?.job?.name || 'Не указано'}
								</m.p>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.35 }}
									className='text-sm text-muted-foreground'
								>
									О себе
								</m.p>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.38 }}
									className={cn('mt-1', !anket?.bio && 'text-muted-foreground')}
								>
									{anket?.bio || 'Не указано'}
								</m.p>
							</div>
							<div>
								<m.p
									variants={textVariants}
									initial='initial'
									animate='animate'
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
									className='text-sm text-muted-foreground'
								>
									Навыки
								</m.p>
								<div className='mt-2'>
									{anket?.skills?.length ? (
										<div className='flex flex-wrap gap-x-2 gap-y-3'>
											{anket.skills.map((skill: any, i: number) => (
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
									Языки
								</m.p>
								<div className='mt-2'>
									{anket?.languages?.length ? (
										<div className='flex flex-wrap gap-2'>
											{anket.languages.map((language: any, i: number) => (
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
													{i < anket.languages.length - 1 && ', '}
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
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.48 }}
									className='text-sm text-muted-foreground'
								>
									Интересующие ниши
								</m.p>
								<div className='mt-2'>
									{anket?.industries?.length ? (
										<div className='flex flex-wrap gap-2'>
											{anket.industries.map((industry: any, i: number) => (
												<m.span
													key={i}
													variants={textVariants}
													initial='initial'
													animate='animate'
													transition={{
														duration: 0.3,
														ease: 'easeOut',
														delay: 0.51,
													}}
													className='text-black dark:text-white'
												>
													{typeof industry === 'string'
														? industry
														: industry.name}
													{i < anket.industries.length - 1 && ', '}
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
												delay: 0.51,
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
									transition={{ duration: 0.3, ease: 'easeOut', delay: 0.53 }}
									className='text-sm text-muted-foreground mb-1'
								>
									Портфолио
								</m.p>
								{anket?.portfolio?.length ? (
									anket.portfolio.map((link: string, index: number) => (
										<div className='flex flex-col overflow-hidden'>
											<m.a
												key={index}
												href={link}
												target='_blank'
												variants={textVariants}
												initial='initial'
												animate='animate'
												transition={{
													duration: 0.3,
													ease: 'easeOut',
													delay: 0.56,
												}}
												className='whitespace-nowrap truncate mt-1 text-base transition-all duration-500 border-b border-b-foreground dark:hover:border-b-white border-dashed text-foreground hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white w-fit'
											>
												{link}
											</m.a>
										</div>
									))
								) : (
									<m.p
										variants={textVariants}
										initial='initial'
										animate='animate'
										transition={{ duration: 0.3, ease: 'easeOut', delay: 0.56 }}
										className='text-muted-foreground'
									>
										Не указано
									</m.p>
								)}
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
						<Button variant={'destructive'} onClick={handleDeleteAnket}>
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
