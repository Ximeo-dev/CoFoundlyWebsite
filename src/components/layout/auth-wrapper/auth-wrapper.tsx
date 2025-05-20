'use client'

import { useAuth } from '@/hooks/useAuth'
import NotificationList from '@/components/layout/notification-list/notification-list'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import { cn } from '@/lib/utils'
import styles from '@/app/profile/components/profile.module.css'
import Home from '@/app/(public)/home'
import ProfileSidebar from '@/app/(auth)/components/profile-sidebar/profile-sidebar'
import { useEffect, useState } from 'react'

export default function AuthWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const { isAuthenticated } = useAuth()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		console.log('[AuthWrapper] isAuthenticated:', isAuthenticated)
	}, [isAuthenticated])


	if (!isAuthenticated) {
		return (
			<ContainerWrapper>
				<Home />
			</ContainerWrapper>
		)
	}

	return (
		<ContainerWrapper>
			<div className={styles.profile_main}>
				<ProfileSidebar />
				<div className={cn(styles.profile_section, '')}>{children}</div>
				<NotificationList />
				{/* <EmailConfirmationNotification /> */}
			</div>
		</ContainerWrapper>
	)
}
