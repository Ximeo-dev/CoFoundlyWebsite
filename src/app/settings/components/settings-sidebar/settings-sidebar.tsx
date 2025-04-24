'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { ISettingsItem, SETTINGS_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './settings-sidebar.module.css'

interface ISettingsSidebar {
	selected: string
	onSelect: (id: string) => void
}

export default function SettingsSidebar({
	selected,
	onSelect,
}: ISettingsSidebar) {
	const [isOpen, setIsOpen] = useState(false)

	const toggleSidebar = () => setIsOpen(!isOpen)

	return (
		<>
			<div className='lg:hidden fixed top-4 left-4 z-50'>
				<button
					className={
						!isOpen
							? 'dark:bg-[#151515] bg-white border border-[#d9d7d7] dark:border-[#3a3a3a] rounded-full w-16 h-16 flex items-center justify-center'
							: ''
					}
					onClick={toggleSidebar}
				>
					{!isOpen && <Menu size={28} />}
				</button>
			</div>

			<aside
				className={cn(
					styles.sidebar_wrapper,
					'bg-white dark:bg-[#151515] border-r border-[#d9d7d7] dark:border-[#3a3a3a] z-40 transition-transform duration-300',
					isOpen ? 'translate-x-0' : '-translate-x-full',
					'lg:translate-x-0 lg:static lg:block'
				)}
			>
				<div className={styles.title_block}>
					<Link href={ENDPOINTS.HOME} className={styles.title}>
						CoFoundly
					</Link>
				</div>

				<ul className={styles.sidebar_list}>
					{SETTINGS_MENU.map((item: ISettingsItem) => (
						<li
							key={item.id}
							className={cn(
								'flex items-center gap-x-3 py-2 text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white cursor-pointer transition-colors duration-300',
								selected === item.id
									? 'text-black dark:text-white hover:text-neutral-800 dark:hover:text-white/90 font-medium'
									: ''
							)}
							onClick={() => {
								onSelect(item.id)
								setIsOpen(false)
							}}
						>
							<item.icon size={18} /> {item.label}
						</li>
					))}
				</ul>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 z-30 lg:hidden backdrop-blur-2xl'
					onClick={toggleSidebar}
				/>
			)}
		</>
	)
}
