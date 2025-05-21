'use client'

import { cn } from '@/lib/utils'

interface IUnreadMessageIndicator {
	count: number
	variant: 'dot' | 'count'
	className?: string
}

export default function UnreadMessageIndicator({
	count,
	variant = 'count',
	className,
}: IUnreadMessageIndicator) {
	if (count <= 0) return null

	return (
		<div
			className={cn(
				'dark:bg-white bg-black text-white dark:text-black rounded-full flex items-center justify-center mr-1',
				{
					'h-5 w-5 text-xs': variant === 'count',
					'h-4 w-4': variant === 'dot',
				},
				className
			)}
		>
			{variant === 'count' && (count > 9 ? '9+' : count)}
		</div>
	)
}
