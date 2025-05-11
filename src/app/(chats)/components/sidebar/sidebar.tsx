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
		<aside className='flex flex-col items-center justify-between py-5 border-r border-border w-full'>
			<Link href={ENDPOINTS.HOME} className='mb-8'>
				{isMounted && (
					<Image
						priority
						src={resolvedTheme === 'dark' ? '/logo.svg' : '/logo-light.svg'}
						alt='logo'
						width={50}
						height={50}
					/>
				)}
			</Link>
			<div className='flex flex-col items-center gap-6'>
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
						<item.icon size={27} />
					</Link>
				))}
			</div>
			<button
				onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			>
				<Moon
					className='text-[#7C7275] hover:text-white transition-colors duration-300'
					size={27}
				/>
			</button>
		</aside>
	)
}
