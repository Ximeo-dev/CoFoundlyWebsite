import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { PROJECT_DESCRIPTION, PROJECT_NAME } from '@/constants/seo.constants'
import Header from '@/components/layout/header/header'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin', 'cyrillic']
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
  children: React.ReactNode;
}>) {
  return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${inter.className} antialiased overflow-x-auto min-h-screen bg-white dark:bg-[#151515]`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<Header />
						<main>
							{children}
						</main>
						<Toaster />
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
