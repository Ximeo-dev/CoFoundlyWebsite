import { cn } from '@/lib/utils'
import styles from './progress-bar.module.css'

export default function ProgressBar({ progress }: { progress: number }) {
  return (
		<div className={styles.percent_block}>
			<span className='text-xs text-muted-foreground block mb-1'>
				Заполнено на {progress}%
			</span>
			<div
				className={cn(
					'h-2 rounded-full transition-all duration-500 transition-colors',
					progress <= 33
						? 'bg-gradient-to-r from-red-500 to-red-400 dark:from-red-600 dark:to-red-500'
						: progress <= 66
						? 'bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-600 dark:to-yellow-500'
						: 'bg-gradient-to-r from-green-500 to-green-400 dark:from-green-600 dark:to-green-500'
				)}
				style={{ width: `${progress}%` }}
			/>
		</div>
	)
}