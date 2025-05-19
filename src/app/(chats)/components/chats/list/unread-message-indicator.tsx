'use client'

import { cn } from '@/lib/utils'

interface IUnreadMessageIndicator {
  count: number
  variant: 'dot' | 'count'
  className?: string
}

export default function UnreadMessageIndicator({ count, variant = 'count', className }: IUnreadMessageIndicator) {
  if (count <= 0) return null

  return (
		<div
			className={cn(
				'bg-black text-white dark:bg-white dark:text-black text-white rounded-full flex items-center justify-center',
				{
					'h-4 w-4 text-xs': variant === 'count',
					'h-4 w-4': variant === 'dot',
				},
				className
			)}
		>
			{variant === 'count' && (count > 9 ? '9+' : count)}
		</div>
	)
}