import Header from '@/components/layout/header/header'

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	)
}
