'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { IMenuSection, SIDEBAR_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { AlignLeft, ChevronDown, ChevronRight, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function ProfileSidebar() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [expandedSections, setExpandedSections] = useState<string[]>([])

	const toggleSidebar = () => setIsOpen(!isOpen)
	
	const isChatPage = pathname === '/chats'
	const isExpanded = (isOpen || (isHovered && !isChatPage)) && !isChatPage

	const toggleSection = (sectionLabel: string) => {
		setExpandedSections(prev =>
			prev.includes(sectionLabel)
				? prev.filter(label => label !== sectionLabel)
				: [...prev, sectionLabel]
		)
	}

	return (
		<>
			{/* Mobile Header */}
			<div className='lg:hidden fixed top-0 left-0 right-0 z-20 h-16 bg-background/85 backdrop-blur-md border-b border-border flex items-center px-4'>
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

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed top-0 left-0 h-full bg-background border-r border-border z-40',
					'transition-all duration-300 ease-in-out',
					isOpen
						? 'w-64 translate-x-0'
						: 'w-20 -translate-x-full lg:translate-x-0',
					isHovered && !isOpen && 'w-64 lg:shadow-lg'
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className='p-4 h-16 flex items-center justify-center'>
					{isExpanded ? (
						<Link
							href={ENDPOINTS.HOME}
							className='text-xl font-semibold text-black dark:text-white transition-opacity duration-300'
						>
							CoFoundly
						</Link>
					) : (
						<div className='w-8 h-8 rounded-full bg-primary transition-opacity duration-300' />
					)}
				</div>

				<nav className='p-2 space-y-4 h-[calc(100%-4rem)] overflow-hidden'>
					{SIDEBAR_MENU.map(section => (
						<div key={section.label} className='mb-4'>
							{/* Section Header - Reserve space even when collapsed */}
							<div
								className={cn(
									'flex items-center justify-between px-2 py-1 mb-1 text-sm font-medium text-muted-foreground transition-opacity duration-300',
									section.collapsible && 'cursor-pointer',
									'h-6' // Fixed height to reserve space
								)}
								onClick={() =>
									section.collapsible && toggleSection(section.label)
								}
								style={{ minHeight: '30px' }}
							>
								{isExpanded ? (
									<span>{section.label}</span>
								) : (
									<span className='opacity-0' style={{ minWidth: '0' }}>
										{section.label}
									</span>
								)}
								{section.collapsible && isExpanded && (
									<span className='transition-transform duration-300'>
										{expandedSections.includes(section.label) ? (
											<ChevronDown size={16} />
										) : (
											<ChevronRight size={16} />
										)}
									</span>
								)}
							</div>

							{/* Section Items */}
							{(section.collapsible
								? expandedSections.includes(section.label)
								: true) && (
								<ul className='space-y-1'>
									{section.items.map(item => (
										<li key={item.href}>
											<Link
												href={item.href}
												className={cn(
													'flex items-center gap-x-3 py-2.5 px-2 rounded-lg',
													'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white',
													'transition-colors duration-200',
													pathname === item.href &&
														'text-black dark:text-white font-medium',
													!isExpanded && 'justify-center'
												)}
											>
												<item.icon size={20} className='flex-shrink-0' />
												<span
													className={cn(
														'whitespace-nowrap overflow-hidden transition-opacity duration-300',
														isExpanded ? 'opacity-100 block' : 'opacity-0 hidden'
													)}
													// style={{ minWidth: '120px' }}
												>
													{item.label}
												</span>
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</nav>
			</aside>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 z-30 lg:hidden dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300'
					onClick={toggleSidebar}
				/>
			)}
		</>
	)
}
