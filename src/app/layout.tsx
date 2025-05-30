import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { PROJECT_DESCRIPTION, PROJECT_NAME } from '@/constants/seo.constants'
import Header from '@/components/layout/header/header'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/providers/auth-provider'
import Footer from '@/components/layout/footer/footer'
import { SocketProvider } from '@/providers/socket-provider'
import { NotificationProvider } from '@/providers/notifications-provider'
import NotificationList from '@/components/layout/notification-list/notification-list'
import { AuthWrapper } from '@/components/layout/auth-wrapper/auth-wrapper'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: {
		default: PROJECT_NAME,
		template: `%s | ${PROJECT_NAME}`,
	},
	description: PROJECT_DESCRIPTION,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<AuthProvider>
							<SocketProvider>
								<NotificationProvider>
									<Toaster duration={3000} />
									<AuthWrapper>{children}</AuthWrapper>
								</NotificationProvider>
							</SocketProvider>
						</AuthProvider>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
