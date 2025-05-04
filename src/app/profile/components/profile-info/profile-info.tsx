'use client'

import maskEmail from '@/utils/maskEmail'
import styles from './profile-info.module.css'
import { cn } from '@/lib/utils'
import Avatar from './avatar'
import { useAuth } from '@/hooks/useAuth'
import FadeIn from 'react-fade-in'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'

export default function ProfileInfo() {
	const { user } = useAuth()

	return (
		<div className={styles.info_main}>
			<div className={styles.info_block}>
				<Avatar editable size={512} />
				<div className={styles.text_block}>
					<FadeInUp className={styles.name}>
						{user?.name || ''}
					</FadeInUp>
					<FadeInUp
						className='text-[#696363] dark:text-[#929191] text-sm'
					>
						{(user?.email && maskEmail(user.email)) || ''}
					</FadeInUp>
				</div>
			</div>

			<FadeInUp className={styles.block_name}>
				Личные данные
			</FadeInUp>

			<div className={styles.change_block}>
				<div className={styles.list}>
					<div className={cn(styles.list_block, 'border-border')}>
						<div>
							<FadeInUp className={styles.list_item}>
								Имя
							</FadeInUp>
							<FadeInUp
								className='text-[#696363] dark:text-[#929191] text-sm'
							>
								{user?.name || ''}
							</FadeInUp>
						</div>
						<button
							className={cn(
								styles.change_button,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							{user && user?.name ? 'Изменить' : 'Указать имя'}
						</button>
					</div>
					<div className={cn(styles.age, 'border-border')}>
						<div>
							<FadeInUp className={styles.list_item}>
								Возраст
							</FadeInUp>
							<FadeInUp
								className='text-[#696363] dark:text-[#929191] text-sm'
							>
								20
							</FadeInUp>
						</div>
						<button
							className={cn(
								styles.change_button,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							Изменить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
