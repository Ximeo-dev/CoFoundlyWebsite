'use client'

import { useState } from 'react'

interface TooltipProps {
	children: React.ReactNode
	text: string
	position?: 'top' | 'bottom' | 'left' | 'right'
	className?: string
}

export default function Tooltip ({ children, text, position = 'top', className }: TooltipProps) {
	const [visible, setVisible] = useState(false)

	const positions: Record<string, string> = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2.5',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2',
	}

	return (
		<div
			className='relative inline-block'
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			{children}
			{visible && (
				<div
					className={`absolute ${positions[position]} hidden md:block px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-xs rounded-[15px] shadow-md z-10 whitespace-nowrap animation-tooltip ${className}`}
				>
					{text}
				</div>
			)}
		</div>
	)
}
