'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SIDEBAR_MENU } from '@/constants/menu.constants'
import { usePathname } from 'next/navigation'
import { Moon } from 'lucide-react'

export default function Sidebar() {
	const { resolvedTheme, setTheme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<aside className='flex md:flex-col flex-row items-center md:justify-between justify-around py-2 md:py-5 border-t md:border-r border-border w-full md:w-auto fixed bottom-0 md:static bg-background z-50'>
			<Link href={ENDPOINTS.HOME} className='mb-0 md:mb-8'>
				{isMounted && (
					<Image
						priority
						src={resolvedTheme === 'dark' ? '/logo.svg' : '/logo-light.svg'}
						alt='logo'
						width={30}
						height={30}
						className='md:w-[50px] md:h-[50px]'
					/>
				)}
			</Link>
			<div className='flex md:flex-col items-center gap-5 md:gap-6'>
				{SIDEBAR_MENU.map(item => (
					<Link
						key={item.url}
						href={item.url}
						className={cn(
							'text-[#7C7275] hover:text-white transition-colors duration-300',
							{
								'text-white': pathname === item.url,
							}
						)}
					>
						<item.icon size={24} />
					</Link>
				))}
			</div>
			<button
				onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			>
				<Moon
					className='text-[#7C7275] hover:text-white transition-colors duration-300'
					size={24}
				/>
			</button>
		</aside>
	)
}
