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

	const paddingClasses = cn(
		pathname === '/swipes'
			? 'px-4 sm:px-6 md:px-10 lg:px-20 2xl:px-60'
			: pathname === '/profile'
			? 'px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24'
			: pathname === '/chats'
			? 'px-0'
			: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
	)

	return (
		<div
			className={cn(styles.container_wrapper, paddingClasses)}
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
				className='absolute inset-0 -z-10 opacity-10 dark:opacity-20 block dark:hidden'
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(0, 0, 0, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
					backgroundSize: '35px 35px',
				}}
			/>
			<div
				className='absolute inset-0 -z-10 opacity-10 dark:opacity-20 hidden dark:block'
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
					backgroundSize: '35px 35px',
				}}
			/>
			{/* <div
				className='absolute inset-0 -z-10 opacity-100 dark:hidden'
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
					backgroundSize: '25px 25px',
				}}
			/> */}
			{/* <div
				className='absolute inset-0 -z-10 opacity-100 hiiden dark:block'
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
					backgroundSize: '25px 25px',
				}}
			/> */}
			{children}
		</div>
	)
}
