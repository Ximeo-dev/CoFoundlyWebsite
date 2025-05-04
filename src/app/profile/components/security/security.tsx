'use client'

import maskEmail from '@/utils/maskEmail'
import ResetPassword from '../profile-info/reset-password'
import styles from './security.module.css'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import TwoFactor from './2fa'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'

export default function Security() {
  const { user } = useAuth()

  return (
		<div className={styles.sec_block}>
			<FadeInUp className={styles.sec_title}>
				Безопасность
			</FadeInUp>
			<div className={styles.sec_inner}>
				<div className={styles.sec}>
					<div className={cn(styles.change_block, 'border-border')}>
						<div>
							<FadeInUp className={styles.email}>
								Электронная почта
							</FadeInUp>
							<FadeInUp
								className={cn(
									styles.user_email,
									'text-[#696363] dark:text-[#929191]'
								)}
							>
								{(user?.email && maskEmail(user.email)) || ''}
							</FadeInUp>
						</div>
						<button
							className={cn(
								styles.change_btn,
								'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
							)}
						>
							Изменить
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