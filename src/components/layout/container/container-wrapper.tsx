'use client'

import { ReactNode } from 'react'
import styles from './container-wrapper.module.css'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function ContainerWrapper({
	children,
}: {
	children: ReactNode
}) {
	const pathname = usePathname()

	const isSwipePage = pathname === '/swipe-users'
	const isCreateOrEditAnketPage = pathname === '/profile'

	return (
		<div
			className={cn(
				styles.container_wrapper,
				isSwipePage
					? 'px-3 sm:px-8 md:px-20 lg:px-44 xl:px-72'
					: isCreateOrEditAnketPage
					? 'px-3 sm:px-8 md:px-24 lg:px-32 xl:px-44'
					: 'px-3 sm:px-8 md:px-14 lg:px-15 xl:px-20'
			)}
		>
			<div className={styles.container_bg}>
				<div
					className={cn(
						styles.container_bg_inner,
						'bg-cyan-300 dark:bg-indigo-100 hidden md:block'
					)}
				/>
			</div>
			<div
				className='absolute inset-0 -z-10 opacity-100 dark:hidden'
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
					backgroundSize: '25px 25px',
				}}
			/>
			<div
				className='absolute inset-0 -z-10 opacity-100 hiiden dark:block'
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
					backgroundSize: '25px 25px',
				}}
			/>
			{/* <div
					className='absolute inset-0 -z-10 opacity-10 dark:opacity-20 hidden dark:block'
					style={{
						backgroundImage:
							'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
						backgroundSize: '40px 40px',
					}}
				/> */}
			{children}
		</div>
	)
}
