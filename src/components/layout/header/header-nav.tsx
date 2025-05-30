'use client'

import { IHeaderItem, IMenuItem, MENU } from '@/constants/menu.constants'
import styles from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import LoginButton from '@/components/ui/login-button/login-button'
import { ENDPOINTS } from '@/config/endpoints.config'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import More from './more'
import { useTheme } from 'next-themes'

export default function HeaderNav() {
  const [show, setShow] = useState(false)
	const { resolvedTheme } = useTheme()

	const [isMounted, setIsMounted] = useState(false)
	
	useEffect(() => {
		setIsMounted(true)
	}, [])

  return (
		<nav className={styles.nav}>
			<div className='w-[50px] h-[50px] relative'>
				<Link href={ENDPOINTS.HOME} className={styles.logo}>
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
			</div>
			<ul className={styles.nav_list}>
				{MENU.map((item: IHeaderItem) => (
					<li key={item.id}>
						<Link
							className={cn(
								styles.list_item,
								'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white'
							)}
							href={item.href}
						>
							{item.label}
						</Link>
					</li>
				))}
				<div
					className={cn(
						styles.nav_more,
						'group text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white'
					)}
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
				>
					<div className={cn(styles.nav_more_btn, '')}>
						Дополнительно
						<ChevronDown
							className={`${
								show ? 'rotate-180' : ''
							} transition-transform duration-300`}
							size={15}
						/>
					</div>
					{show && (
						<div className={styles.nav_more_block}>
							<More />
						</div>
					)}
				</div>
			</ul>
			<LoginButton />
		</nav>
	)
}