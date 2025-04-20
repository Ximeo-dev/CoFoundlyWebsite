import { ReactNode } from 'react'
import styles from './badge.module.css'
import * as motion from 'motion/react-client'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

export default function Badge({ children }: { children: ReactNode }) {
  return (
		<motion.div
			variants={slideUp}
			initial='hidden'
			animate='visible'
			className={cn(
				styles.badge,
				'bg-black dark:bg-white text-white dark:text-[#111111]'
			)}
		>
			{children}
		</motion.div>
	)
}