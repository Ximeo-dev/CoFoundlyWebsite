'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/header/header'
import styles from './components/profile.module.css'
import { cn } from '@/lib/utils'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import ProfileSidebar from './components/profile-sidebar/profile-sidebar'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <div>Loading...</div>
	if (!isAuthenticated) {
		redirect('/welcome')
	}

	return (
		<>
			<ContainerWrapper>
				<div className={styles.profile_main}>
					<ProfileSidebar />
					<div className={cn(styles.profile_section, '')}>{children}</div>
				</div>
				{/* <EmailConfirmationNotification /> */}
			</ContainerWrapper>
		</>
	)
}
