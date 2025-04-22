'use client'

import ContainerWrapper from '../container/container-wrapper'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'
import { PROJECT_NAME } from '@/constants/seo.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import styles from './footer.module.css'
import { IMenuItem, MENU } from '@/constants/menu.constants'

export default function FooterNav() {
  return (
		<div
			className={cn(
				styles.footer,
				'bg-white border border-[#d9d7d7] dark:bg-[#1A1A1A] dark:border-[#3a3a3a]'
			)}
		>
			<nav className={styles.footer_nav}>
				<div className={styles.lt_block}>
					<h2 className='text-2xl select-none'>{PROJECT_NAME}</h2>
					<span className='text-xs text-zinc-700 dark:text-gray-300'>
						2025 &copy; Все права защищены
					</span>
				</div>
				<ul className={styles.list}>
					{MENU.map((item: IMenuItem) => (
						<li key={item.id}>
							<Link
								href={item.href}
								className='text-base transition-all duration-500 border-b border-b-transparent hover:border-b-foreground dark:hover:border-b-white border-dashed text-foreground hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}