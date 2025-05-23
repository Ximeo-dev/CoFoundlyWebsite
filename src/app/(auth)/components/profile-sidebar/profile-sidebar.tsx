'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { IMenuSection, SIDEBAR_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AlignLeft, ChevronDown, ChevronRight, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { ResponseError } from '@/types/error.types'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import MobileNav from '@/components/layout/header/mobile/mobile-nav'
import Tooltip from '@/components/ui/tooltip/tooltip'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'

export default function ProfileSidebar() {
	const { resolvedTheme, setTheme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const queryClient = useQueryClient()
	const { setUser, setIsAuthenticated } = useAuth()

	const [expandedSections, setExpandedSections] = useState<string[]>([
		'Основное',
		'Управление',
	])
	const [isMoreHovered, setIsMoreHovered] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const isChatPage = pathname === '/chats'
	const isExpanded = !isChatPage

	const toggleSidebar = () => setIsOpen(!isOpen)

	const toggleSection = (sectionLabel: string) => {
		setExpandedSections(prev =>
			prev.includes(sectionLabel)
				? prev.filter(label => label !== sectionLabel)
				: [...prev, sectionLabel]
		)
	}

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			setIsAuthenticated(false)
			setUser(null)
			queryClient.setQueryData(['userProfile'], null)
			window.location.href = ENDPOINTS.WELCOME
		},
		onError: (error: ResponseError) => {
			toast.error('Что-то пошло не так')
			console.log(error)
		},
	})

	return (
		<>
			<MobileNav />

			<aside
				className={cn(
					'fixed top-0 left-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ease-in-out',
					isOpen
						? 'w-[80%] max-w-[240px] translate-x-0'
						: 'w-20 -translate-x-full lg:translate-x-0',
					isChatPage ? 'w-20' : 'w-[80%] max-w-[240px]'
				)}
			>
				<div className='py-12 flex items-center justify-center'>
					{isExpanded ? (
						<Link
							href={ENDPOINTS.HOME}
							className='text-3xl font-semibold text-black dark:text-white transition-opacity duration-300'
						>
							CoFoundly
						</Link>
					) : (
						<Link href={ENDPOINTS.HOME} className='mb-0 md:mb-8'>
							{isMounted && (
								<Image
									priority
									src={
										resolvedTheme === 'dark' ? '/logo.svg' : '/logo-light.svg'
									}
									alt='logo'
									width={30}
									height={30}
									className='md:w-[50px] md:h-[50px]'
								/>
							)}
						</Link>
					)}
				</div>

				<nav className='py-2 px-3 space-y-4 flex flex-col'>
					{SIDEBAR_MENU.map(section => (
						<div key={section.label} className='mb-10 flex-1'>
							<div
								className={cn(
									'relative flex items-center justify-between px-2 py-1 mb-3 text-sm font-medium text-muted-foreground transition-opacity duration-300',
									section.collapsible && 'cursor-pointer',
									'h-6'
								)}
								onClick={() =>
									section.collapsible && toggleSection(section.label)
								}
								onMouseEnter={() =>
									section.label === 'Ещё' &&
									isExpanded &&
									setIsMoreHovered(true)
								}
								onMouseLeave={() =>
									section.label === 'Ещё' && setIsMoreHovered(false)
								}
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
										{/* {expandedSections.includes(section.label) ? (
											(<ChevronDown />) : '' */}
										<ChevronDown />
									</span>
								)}

								{/* {section.label === 'Ещё' && isMoreHovered && isExpanded && (
									<LazyMotion features={domAnimation}>
										<m.div
											className='absolute left-0 top-4 rounded-[20px] shadow-lg bg-white dark:bg-[#1A1A1A] border border-border z-50 w-[200px]'
											initial={{ y: 0, opacity: 0 }}
											animate={{ y: 10, opacity: 1 }}
											transition={{
												type: 'spring',
												stiffness: 210,
												damping: 17,
											}}
										>
											<ul className='flex flex-col gap-y-4 px-4 py-2'>
												{section.items.map(item => (
													<li key={item.href}>
														<Link
															href={item.href}
															className='h-full flex items-center gap-x-3 text-base text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white font-medium transition-colors duration-300'
														>
															<item.icon size={16} />
															{item.label}
														</Link>
													</li>
												))}
											</ul>
										</m.div>
									</LazyMotion>
								)} */}
							</div>

							{section.label !== 'Ещё' &&
								(section.collapsible
									? expandedSections.includes(section.label)
									: true) && (
									<ul className='space-y-1'>
										{section.items.map(item => (
											<li key={item.href}>
												{item.href === '/logout' ? (
													<button
														onClick={() => logout()}
														className={cn(
															'cursor-pointer flex items-center gap-x-3 py-2.5 px-2 rounded-lg w-full text-left',
															'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white',
															'transition-all duration-300 hover:-translate-y-0.5',
															!isExpanded && 'justify-center'
														)}
													>
														<item.icon size={20} className='flex-shrink-0' />
														<span
															className={cn(
																'whitespace-nowrap overflow-hidden transition-opacity duration-300',
																isExpanded
																	? 'opacity-100 block'
																	: 'opacity-0 hidden'
															)}
														>
															{item.label}
														</span>
													</button>
												) : (
													<Link
														href={item.href}
														className={cn(
															'flex items-center gap-x-3 py-3.5 px-2 rounded-lg',
															'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white',
															'transition-all duration-300 hover:-translate-y-0.5',
															pathname === item.href &&
																'text-black dark:text-white font-medium',
															!isExpanded && 'justify-center'
														)}
													>
														{!isExpanded ? (
															<Tooltip text={item.label} position='right'>
																<item.icon
																	size={20}
																	className='flex-shrink-0'
																/>
																<span
																	className={cn(
																		'whitespace-nowrap overflow-hidden transition-opacity duration-300',
																		isExpanded
																			? 'opacity-100 block'
																			: 'opacity-0 hidden'
																	)}
																>
																	{item.label}
																</span>
															</Tooltip>
														) : (
															<>
																<item.icon
																	size={20}
																	className='flex-shrink-0'
																/>
																<span
																	className={cn(
																		'whitespace-nowrap overflow-hidden transition-opacity duration-300',
																		isExpanded
																			? 'opacity-100 block'
																			: 'opacity-0 hidden'
																	)}
																>
																	{item.label}
																</span>
															</>
														)}
													</Link>
												)}
											</li>
										))}
									</ul>
								)}
						</div>
					))}
					<ModeToggle direction={pathname === '/chats' ? 'column' : 'row'} />
				</nav>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 z-30 lg:hidden dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300'
					onClick={toggleSidebar}
				/>
			)}
		</>
	)
}
