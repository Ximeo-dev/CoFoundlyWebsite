import { ReactNode } from 'react'
import styles from './container-wrapper.module.css'
import { cn } from '@/lib/utils'

export default function ContainerWrapper({
	children,
}: {
	children: ReactNode
}) {
	return (
		<section className={styles.container_wrapper}>
			<div className={styles.container_bg}>
				<div
					className={cn(
						styles.container_bg_inner,
						'bg-cyan-300 dark:bg-purple-200'
					)}
				/>
			</div>
			<div
				className='absolute inset-0 -z-10 opacity-100 dark:hidden'
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
					backgroundSize: '25px 25px',
				}}
			/>
			<div
				className='absolute inset-0 -z-10 opacity-10 dark:opacity-20 hidden dark:block'
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
					backgroundSize: '40px 40px',
				}}
			/>
			{children}
		</section>
	)
}
