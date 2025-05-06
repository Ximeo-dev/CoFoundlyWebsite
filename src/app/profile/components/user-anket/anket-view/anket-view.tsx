'use client'

import { Pencil } from 'lucide-react'
import Avatar from '../../profile-info/avatar'
import { cn } from '@/lib/utils'
import styles from './anket-view.module.css'
import { differenceInYears } from 'date-fns'

export default function AnketView({
	anket,
	onEdit,
	editable = false,
}: {
	anket: any
	onEdit?: () => void
	editable?: boolean
}) {
	const filledFields = [
		anket?.bio,
		anket?.skills?.length,
		anket?.portfolio?.length,
	]

	const filledCount = filledFields.filter(Boolean).length
	const totalCount = filledFields.length
	const progress = Math.round((filledCount / totalCount) * 100)

	return (
		<div className={styles.view_block}>
			<div className={cn(styles.view_inner, `border-b border-border`)}>
				<div className={styles.view_top}>
					<h2 className={styles.view_top_text}>
						{editable ? 'Ваша анкета' : 'Анкета'}
					</h2>

					<div className={styles.view_top_block}>
						<div className={styles.percent_block}>
							<span className='text-xs text-muted-foreground block mb-1'>
								Заполнено на {progress}%
							</span>
							<div className='w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2'>
								<div
									className='bg-primary h-2 rounded-full transition-all duration-500'
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>

						{editable && (
							<button
								onClick={onEdit}
								className='text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
								aria-label='Редактировать'
							>
								<Pencil className='w-5 h-5' />
							</button>
						)}
					</div>
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
							{anket.name},{' '}
							{anket.birthDate
								? differenceInYears(new Date(), new Date(anket.birthDate))
								: '—'}
						</h1>
					</div>
				</div>

				<div className={styles.info_block_right}>
					<h3 className={styles.right_title}>Информация в анкете</h3>

					<div className={styles.right_inner}>
						<div>
							<p className='text-sm text-muted-foreground'>Род деятельности</p>
							<p className={cn('mt-1', !anket?.job && 'text-muted-foreground')}>
								{anket?.job || 'Не указано'}
							</p>
						</div>

						<div>
							<p className='text-sm text-muted-foreground'>О себе</p>
							<p className={cn('mt-1', !anket?.bio && 'text-muted-foreground')}>
								{anket?.bio || 'Нет описания'}
							</p>
						</div>

						<div>
							<p className='text-sm text-muted-foreground'>Навыки</p>
							<div className='mt-2'>
								{anket?.skills?.length ? (
									<div className='flex flex-wrap gap-2'>
										{anket.skills.map((skill: string) => (
											<span
												key={skill}
												className='bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full'
											>
												{skill}
											</span>
										))}
									</div>
								) : (
									<p className='text-muted-foreground'>Нет навыков</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
