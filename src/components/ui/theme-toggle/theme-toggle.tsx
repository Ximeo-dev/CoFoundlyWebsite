'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ModeToggle() {
	const { theme, setTheme } = useTheme()

	const modes = [
		{ themeMode: 'system', icon: <Laptop size={18} /> },
		{ themeMode: 'light', icon: <Sun size={18} /> },
		{ themeMode: 'dark', icon: <Moon size={18} /> },
	]

	return (
		<div className='flex items-center border border-[#D9D7D7] dark:border-transparent bg-white dark:bg-[#111] p-1.5 rounded-full space-x-1 relative w-fit'>
			{modes.map(mode => (
				<button
					key={mode.themeMode}
					onClick={() => setTheme(mode.themeMode)}
					className={cn(
						'flex items-center justify-center w-8 h-8 rounded-full relative z-10 text-white transition-colors',
						theme === mode.themeMode
							? 'text-white bg-[#292929]'
							: 'text-neutral-500'
					)}
				>
					{mode.icon}
				</button>
			))}
		</div>
	)
}
