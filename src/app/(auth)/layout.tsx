'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/header/header'
import styles from './components/profile.module.css'
import { cn } from '@/lib/utils'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import ProfileSidebar from './components/profile-sidebar/profile-sidebar'
import { EmailConfirmationNotification } from '@/components/layout/email-confirmation/email-confirmation-notification'

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
			</ContainerWrapper>
		</>
	)
}
