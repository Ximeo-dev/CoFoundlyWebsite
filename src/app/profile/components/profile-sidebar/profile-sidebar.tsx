'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { ISettingsItem, PROFILE_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { AlignLeft, ChevronDown } from 'lucide-react'
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
			<div className={styles.sidebar_btn}>
				<button
					className={
						!isOpen
							? 'bg-background border border-border rounded-[15px] w-12 h-12 flex items-center justify-center'
							: ''
					}
					onClick={toggleSidebar}
				>
					{!isOpen && <AlignLeft size={28} />}
				</button>
			</div>

			<aside
				className={cn(
					styles.sidebar_wrapper,
					'bg-background border-r border-border z-40 transition-transform duration-300',
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
					{PROFILE_MENU.map(
						(item: any & { children?: ISettingsItem[] }) => {
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
											'flex items-center gap-x-3 py-2 text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white cursor-pointer transition-colors duration-300',
											isActive ? 'text-black dark:text-white font-medium' : ''
										)}
										onClick={handleClick}
									>
										<div className='flex items-center gap-x-3'>
											<item.icon size={18} /> {item.label}
										</div>
									</div>
								</li>
							)
						}
					)}
				</ul>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 z-30 lg:hidden backdrop-blur-xl'
					onClick={toggleSidebar}
				/>
			)}
		</>
	)
}
