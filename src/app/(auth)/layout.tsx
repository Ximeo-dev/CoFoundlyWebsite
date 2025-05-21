'use client'

import styles from './components/profile.module.css'
import { cn } from '@/lib/utils'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import ProfileSidebar from './components/profile-sidebar/profile-sidebar'
import { EmailConfirmationNotification } from '@/components/layout/email-confirmation/email-confirmation-notification'
import NotificationList from '@/components/layout/notification-list/notification-list'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<ContainerWrapper>
				<div className={styles.profile_main}>
					<ProfileSidebar />
					<div className={cn(styles.profile_section, '')}>{children}</div>
				</div>
				<EmailConfirmationNotification />
				<NotificationList />
			</ContainerWrapper>
		</>
	)
}
