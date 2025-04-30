'use client'

import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import maskEmail from '@/utils/maskEmail'
import ResetPassword from '../profile-info/reset-password'
import styles from './security.module.css'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

export default function Security() {
  const { user } = useAuth()

  return (
		<div className={styles.sec_block}>
			<TextAnimate
				animation='slideUp'
				by='character'
				duration={0.2}
				className={styles.sec_title}
			>
				Безопасность
			</TextAnimate>
			<div className={styles.sec_inner}>
				<div className={styles.sec}>
					<div
						className={cn(
							styles.change_block,
							'border-[#d9d7d7] dark:border-[#3a3a3a]'
						)}
					>
						<div>
							<TextAnimate
								className={styles.email}
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								Электронная почта
							</TextAnimate>
							<TextAnimate
								className={cn(
									styles.user_email,
									'text-[#696363] dark:text-[#929191]'
								)}
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								{(user?.email && maskEmail(user.email)) || ''}
							</TextAnimate>
						</div>
						<button className={cn(styles.change_btn, 'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700')}>
							Поменять
						</button>
					</div>

					<div className={cn(styles.reset_pass, 'border-[#d9d7d7] dark:border-[#3a3a3a]')}>
						<ResetPassword />
					</div>
				</div>
			</div>
		</div>
	)
}