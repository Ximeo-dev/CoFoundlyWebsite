'use client'

import maskEmail from '@/utils/maskEmail'
import ResetPassword from '../profile-info/reset-password'
import styles from './security.module.css'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import TwoFactor from './2fa'
import FadeIn from 'react-fade-in'

export default function Security() {
  const { user } = useAuth()

  return (
		<div className={styles.sec_block}>
			<FadeIn visible className={styles.sec_title}>
				Безопасность
			</FadeIn>
			<div className={styles.sec_inner}>
				<div className={styles.sec}>
					<div className={cn(styles.change_block, 'border-border')}>
						<div>
							<FadeIn className={styles.email} visible>
								Электронная почта
							</FadeIn>
							<FadeIn
								className={cn(
									styles.user_email,
									'text-[#696363] dark:text-[#929191]'
								)}
								visible
							>
								{(user?.email && maskEmail(user.email)) || ''}
							</FadeIn>
						</div>
						<button
							className={cn(
								styles.change_btn,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							Поменять
						</button>
					</div>

					<TwoFactor />

					<div className={cn(styles.reset_pass, 'border-border')}>
						<ResetPassword />
					</div>
				</div>
			</div>
		</div>
	)
}