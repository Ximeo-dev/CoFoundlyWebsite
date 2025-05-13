'use client'

import { cn } from '@/lib/utils'
import styles from './progress-bar.module.css'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import CountUp from 'react-countup'

export default function ProgressBar({ progress }: { progress: number }) {
	const clampedProgress = Math.min(Math.max(progress, 0), 100)

	const getGradient = () => {
		if (clampedProgress <= 33) {
			return 'linear-gradient(to right, #ef4444, #f87171)'
		} else if (clampedProgress <= 66) {
			return 'linear-gradient(to right, #eab308, #fde047)'
		} else {
			return 'linear-gradient(to right, #10b981, #6ee7b7)'
		}
	}

	const barVariants = {
		initial: { width: '0%' },
		animate: {
			width: `${clampedProgress}%`,
			background: getGradient(),
			transition: {
				width: {
					type: 'spring',
					stiffness: 100,
					damping: 20,
					duration: 0.8,
				},
				background: {
					duration: 0.5,
					ease: 'easeInOut',
				},
			},
		},
	}

	return (
		<div className={styles.percent_block}>
			<span className='text-xs text-muted-foreground block mb-1'>
				Заполнено на{' '}
				<CountUp
					start={0}
					end={clampedProgress}
					duration={0.8}
					suffix='%'
					decimals={0}
					useEasing={true}
				/>
			</span>
			<div className='h-2 rounded-full overflow-hidden'>
				<LazyMotion features={domAnimation}>
					<m.div
						className={cn(
							'h-2 rounded-full',
							clampedProgress <= 33
								? 'bg-gradient-to-r from-red-500 to-red-400 dark:from-red-600 dark:to-red-500'
								: clampedProgress <= 66
								? 'bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-600 dark:to-yellow-500'
								: 'bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-500'
						)}
						variants={barVariants}
						initial='initial'
						animate='animate'
					/>
				</LazyMotion>
			</div>
		</div>
	)
}
