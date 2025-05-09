'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { ISettingsItem, PROFILE_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { AlignLeft, ChevronDown, X } from 'lucide-react'
import styles from './profile-sidebar.module.css'

interface IProfileSidebar {
	selected: string
	onSelect: (id: string) => void
}

export default function ProfileSidebar({
	selected,
	onSelect,
}: IProfileSidebar) {
	const [isOpen, setIsOpen] = useState(false)

	const toggleSidebar = () => setIsOpen(!isOpen)

	return (
		<>
			<div
				className={cn(
					'lg:hidden fixed top-0 left-0 right-0 z-20 h-16 bg-background/85 backdrop-blur-md border-b border-border flex items-center px-4',
					styles.mobile_header
				)}
			>
				<button
					className={cn(
						'bg-background border border-border rounded-[15px] w-10 h-10 flex items-center justify-center shadow-sm transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800',
						isOpen && 'bg-neutral-100 dark:bg-neutral-800'
					)}
					onClick={toggleSidebar}
				>
					{isOpen ? <X size={20} /> : <AlignLeft size={20} />}
				</button>
				<Link
					href={ENDPOINTS.HOME}
					className='ml-4 text-xl font-semibold text-black dark:text-white'
				>
					CoFoundly
				</Link>
			</div>

			<aside
				className={cn(
					styles.sidebar_wrapper,
					'bg-background backdrop-blur-md border-r border-border z-40 transition-transform duration-300 ease-in-out',
					isOpen ? 'translate-x-0' : '-translate-x-full',
					'lg:translate-x-0 lg:static lg:block w-64 lg:w-60'
				)}
			>
				<div className={styles.title_block}>
					<Link
						href={ENDPOINTS.HOME}
						className={cn('text-black dark:text-white', styles.title)}
					>
						CoFoundly
					</Link>
				</div>

				<ul className={styles.sidebar_list}>
					{PROFILE_MENU.map((item: any & { children?: ISettingsItem[] }) => {
						const isActive =
							selected === item.id ||
							item.children?.some((child: any) => child.id === selected)

						const handleClick = () => {
							onSelect(item.id)
							setIsOpen(false)
						}

						return (
							<li key={item.id}>
								<div
									className={cn(
										'flex items-center gap-x-3 py-3 rounded-lg text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white cursor-pointer transition-all duration-200',
										isActive ? 'text-black dark:text-white font-medium' : ''
									)}
									onClick={handleClick}
								>
									<div className='flex items-center gap-x-3'>
										<item.icon size={20} /> {item.label}
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 z-30 lg:hidden  dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300'
					onClick={toggleSidebar}
				/>
			)}
		</>
	)
}
