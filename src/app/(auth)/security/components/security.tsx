'use client'

import maskEmail from '@/utils/maskEmail'
import ResetPassword from './reset-password'
import styles from './security.module.css'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import TwoFactor from './2fa'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'
import ChangeEmail from './change-email'

export default function Security() {
	const { user } = useAuth()

	return (
		<div
			className={cn(
				styles.sec_block,
				'bg-background border border-border rounded-[15px]'
			)}
		>
			<FadeInUp className={styles.sec_title}>Безопасность</FadeInUp>
			<div className={styles.sec_inner}>
				<div className={styles.sec}>
					<ChangeEmail/>

					<TwoFactor />

					<div className={cn(styles.reset_pass, 'border-border')}>
						<ResetPassword />
					</div>
				</div>
			</div>
		</div>
	)
}
