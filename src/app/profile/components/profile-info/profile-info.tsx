'use client'

import { useProfileData } from '@/hooks/useProfileData'
import maskEmail from '@/utils/maskEmail'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import styles from './profile-info.module.css'
import { cn } from '@/lib/utils'

export default function ProfileInfo() {
	const { userProfile } = useProfileData()

	return (
		<div className={styles.info_main}>
			<div className={styles.info_block}>
				<div
					className={cn(
						styles.avatar,
						'border-[#d9d7d7] dark:border-[#3a3a3a] bg-white dark:bg-[#151515]'
					)}
				/>
				<div className={styles.text_block}>
					<TextAnimate
						className={styles.name}
						animation='slideUp'
						by='character'
						duration={0.2}
					>
						{userProfile?.name || ''}
					</TextAnimate>
					<TextAnimate
						animation='slideUp'
						by='character'
						duration={0.2}
						className='text-[#696363] dark:text-[#929191] text-sm'
					>
						{(userProfile?.email && maskEmail(userProfile.email)) || ''}
					</TextAnimate>
				</div>
			</div>

			<TextAnimate
				animation='slideUp'
				by='character'
				duration={0.2}
				className={styles.block_name}
			>
				Личные данные
			</TextAnimate>

			<div className={styles.change_block}>
				<div className={styles.list}>
					<div
						className={cn(
							styles.list_block,
							'border-[#d9d7d7] dark:border-[#3a3a3a]'
						)}
					>
						<div>
							<TextAnimate
								animation='slideUp'
								className={styles.list_item}
								by='character'
								duration={0.2}
							>
								Имя
							</TextAnimate>
							<TextAnimate
								by='character'
								duration={0.2}
								className='text-[#696363] dark:text-[#929191] text-sm'
								animation='slideUp'
							>
								{userProfile?.name || ''}
							</TextAnimate>
						</div>
						<button
							className={cn(
								styles.change_button,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							{userProfile && userProfile?.name ? 'Поменять' : 'Указать имя'}
						</button>
					</div>
					<div
						className={cn(styles.age, 'border-[#d9d7d7] dark:border-[#3a3a3a]')}
					>
						<div>
							<TextAnimate
								className={styles.list_item}
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								Возраст
							</TextAnimate>
							<TextAnimate
								className='text-[#696363] dark:text-[#929191] text-sm'
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								20
							</TextAnimate>
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
