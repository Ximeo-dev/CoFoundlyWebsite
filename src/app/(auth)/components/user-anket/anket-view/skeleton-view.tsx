'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { cn } from '@/lib/utils'
import styles from './anket-view.module.css'

export default function SkeletonView() {
	return (
		<div
			className={cn(
				styles.view_block,
				'bg-background border border-border rounded-[15px]'
			)}
		>
			<div className={cn(styles.view_inner, 'border-b border-border')}>
				<div className={styles.view_top}>
					<Skeleton className='h-7 w-32' />
					<div className={styles.percent_block}>
						<Skeleton className='h-4 w-20 mb-1' />
						<Skeleton className='h-2 w-[150px] rounded-full' />
					</div>
					<div className='flex items-center gap-x-5'>
						<Skeleton className='h-5 w-5' />
						<Skeleton className='h-5 w-5' />
					</div>
				</div>
			</div>

			<div className={styles.info_block}>
				<div
					className={cn(
						styles.info_block_left,
						'border-b md:border-b-0 md:border-r border-border'
					)}
				>
					<div className={styles.left_block_inner}>
						<Skeleton className='object-cover w-72 h-52 md:w-90 md:h-64 rounded-[15px]' />
						<Skeleton className='h-6 w-40 mt-4' />
					</div>
				</div>

				<div className={styles.info_block_right}>
					<Skeleton className='h-7 w-48 mb-6' />
					<div className={styles.right_inner}>
						<div>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-5 w-32 mt-1' />
						</div>
						<div>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-5 w-64 mt-1' />
						</div>
						<div>
							<Skeleton className='h-4 w-24' />
							<div className='mt-2 flex flex-wrap gap-2'>
								<Skeleton className='h-6 w-20 rounded-full' />
								<Skeleton className='h-6 w-24 rounded-full' />
							</div>
						</div>
						<div>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-5 w-32 mt-1' />
						</div>
						<div>
							<Skeleton className='h-4 w-24 mb-1' />
							<Skeleton className='h-5 w-32 mt-1' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
