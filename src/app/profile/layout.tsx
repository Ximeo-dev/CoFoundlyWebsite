import type { PropsWithChildren } from 'react'
import ProfileSidebar from './components/profile-sidebar/profile-sidebar'
import { cn } from '@/lib/utils'
import { EmailConfirmationNotification } from '@/components/layout/email-confirmation/email-confirmation-notification'
import styles from './components/profile.module.css'
import ContainerWrapper from '@/components/layout/container/container-wrapper'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
		<ContainerWrapper>
			<div className={styles.profile_main}>
				<ProfileSidebar />
				<div className={cn(styles.profile_section, '')}>
					{children}
				</div>
				<EmailConfirmationNotification />
			</div>
		</ContainerWrapper>
	)
}
