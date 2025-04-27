'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { ISettingsItem, SETTINGS_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
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
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)

	const toggleSidebar = () => setIsOpen(!isOpen)

	return (
		<>
			<div className={styles.sidebar_btn}>
				<button
					className={
						!isOpen
							? 'dark:bg-[#151515] bg-white border border-[#d9d7d7] dark:border-[#3a3a3a] rounded-full w-12 h-12 flex items-center justify-center'
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
					{SETTINGS_MENU.map(
						(item: any & { children?: ISettingsItem[] }) => {
							const hasChildren = item.children && item.children.length > 0
							const isDropdownOpen = openDropdown === item.id
							const isActive =
								selected === item.id ||
								item.children?.some((child: any) => child.id === selected)

							const handleClick = () => {
								if (hasChildren) {
									if (openDropdown === item.id) {
										setOpenDropdown(null)
									} else {
										setOpenDropdown(item.id)
										onSelect(item.children?.[0]?.id || '')
										setIsOpen(false)
									}
								} else {
									onSelect(item.id)
									setIsOpen(false)
								}
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
										{hasChildren && (
											<ChevronDown
												size={18}
												className={cn(
													'transition-transform duration-300',
													isDropdownOpen ? 'rotate-180' : 'rotate-0'
												)}
											/>
										)}
									</div>

									{hasChildren && (
										<ul
											className={cn(
												'ml-10 overflow-hidden transition-all duration-500',
												isDropdownOpen
													? 'max-h-40 opacity-100'
													: 'max-h-0 opacity-0'
											)}
										>
											{item.children.map((child: any) => (
												<li
													key={child.id}
													className={cn(
														'py-1.5 text-sm cursor-pointer text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white transition-colors duration-300',
														selected === child.id
															? 'text-black dark:text-white font-medium'
															: ''
													)}
													onClick={() => {
														onSelect(child.id)
														setIsOpen(false)
													}}
												>
													{child.label}
												</li>
											))}
										</ul>
									)}
								</li>
							)
						}
					)}
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
