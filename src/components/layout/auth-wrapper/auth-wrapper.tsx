'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { ENDPOINTS } from '@/config/endpoints.config'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (isLoading) return

		const isAuthPage =
			pathname.startsWith(ENDPOINTS.LOGIN) ||
			pathname.startsWith(ENDPOINTS.REGISTER)
		const isWelcomePage = pathname.startsWith(ENDPOINTS.WELCOME)
		const isPasswordResetPage =
			pathname.startsWith('/reset-password') ||
			pathname.startsWith('/reset-password/confirm')

		if (isPasswordResetPage) return

		if (isAuthenticated) {
			if (isAuthPage || isWelcomePage) {
				router.push(ENDPOINTS.HOME)
			}
		} else {
			if (!isAuthPage && !isWelcomePage) {
				router.push(ENDPOINTS.WELCOME)
			}
		}
	}, [isAuthenticated, isLoading, pathname, router])

	if (isLoading) {
		return <div></div>
	}

	return <>{children}</>
}
