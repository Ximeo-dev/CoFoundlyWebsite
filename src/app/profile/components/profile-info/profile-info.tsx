'use client'

import maskEmail from '@/utils/maskEmail'
import styles from './profile-info.module.css'
import { cn } from '@/lib/utils'
import Avatar from './avatar'
import { useAuth } from '@/hooks/useAuth'
import FadeIn from 'react-fade-in'

export default function ProfileInfo() {
	const { user } = useAuth()

	return (
		<div className={styles.info_main}>
			<div className={styles.info_block}>
				<Avatar editable size={512} />
				<div className={styles.text_block}>
					<FadeIn className={styles.name} visible>
						{user?.name || ''}
					</FadeIn>
					<FadeIn
						visible
						className='text-[#696363] dark:text-[#929191] text-sm'
					>
						{(user?.email && maskEmail(user.email)) || ''}
					</FadeIn>
				</div>
			</div>

			<FadeIn visible className={styles.block_name}>
				Личные данные
			</FadeIn>

			<div className={styles.change_block}>
				<div className={styles.list}>
					<div className={cn(styles.list_block, 'border-border')}>
						<div>
							<FadeIn visible className={styles.list_item}>
								Имя
							</FadeIn>
							<FadeIn
								visible
								className='text-[#696363] dark:text-[#929191] text-sm'
							>
								{user?.name || ''}
							</FadeIn>
						</div>
						<button
							className={cn(
								styles.change_button,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							{user && user?.name ? 'Поменять' : 'Указать имя'}
						</button>
					</div>
					<div className={cn(styles.age, 'border-border')}>
						<div>
							<FadeIn className={styles.list_item} visible>
								Возраст
							</FadeIn>
							<FadeIn
								className='text-[#696363] dark:text-[#929191] text-sm'
								visible
							>
								20
							</FadeIn>
						</div>
						<button
							className={cn(
								styles.change_button,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							Поменять
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
