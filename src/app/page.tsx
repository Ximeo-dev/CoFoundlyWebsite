'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import AnketPage from './(auth)/components/user-anket/anket-page'
import AuthLayout from './(auth)/layout'

export default function RootPage() {
	const { isAuthenticated, isLoading } = useAuth()

	// Показываем загрузку
	if (isLoading) return <div>Loading...</div>

	// Редирект для неавторизованных
	if (!isAuthenticated) {
		redirect('/welcome')
	}

	// Для авторизованных показываем анкету с sidebar
	return (
		<AuthLayout>
			<AnketPage />
		</AuthLayout>
	)
}
