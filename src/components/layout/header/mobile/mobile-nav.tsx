'use client'

import styles from './mobile-nav.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser, House, Menu, X } from 'lucide-react'
import { ENDPOINTS } from '@/config/endpoints.config'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import * as m from 'motion/react-client'
import { LazyMotion, domAnimation } from 'motion/react'
import { SIDEBAR_MENU } from '@/constants/menu.constants'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'
import { cn } from '@/lib/utils'
import DropdownProfile from '@/components/ui/dropdown-profile/dropdown-profile'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { ResponseError } from '@/types/error.types'
import { toast } from 'sonner'

export default function MobileNav() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleMenu = () => setIsOpen(!isOpen)
	const { resolvedTheme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)
	const queryClient = useQueryClient()
	const { isAuthenticated, setUser, setIsAuthenticated } = useAuth()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

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
		<LazyMotion features={domAnimation}>
			<div
				className={cn(styles.menu, 'border-t border-t-border bg-background')}
			>
				<nav className={styles.menu_nav}>
					<ul className={styles.menu_list}>
						<li>
							<m.button whileTap={{ scale: 0.9, rotate: -15 }}>
								<Link href={ENDPOINTS.HOME}>
									<House className={`size-7 text-black dark:text-white mt-1`} />
								</Link>
							</m.button>
						</li>
						<li>
							<m.button
								onClick={toggleMenu}
								whileTap={{ scale: 0.9, rotate: 15 }}
							>
								<Menu className='size-7 text-black dark:text-white mt-1.5' />
							</m.button>
						</li>
						<li>
							{isAuthenticated ? (
								<DropdownProfile />
							) : (
								<m.button whileTap={{ scale: 0.9, rotate: -15 }}>
									<Link href={ENDPOINTS.LOGIN}>
										<CircleUser
											className={`size-7 text-black dark:text-white mt-1`}
										/>
									</Link>
								</m.button>
							)}
						</li>
					</ul>
				</nav>
				<AnimatePresence>
					{isOpen && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className={cn(styles.open_block, 'bg-background')}
						>
							<div className={styles.open_logo}>
								<Link href={ENDPOINTS.HOME}>
									{isMounted && (
										<Image
											src={
												resolvedTheme === 'dark'
													? '/logo.svg'
													: '/logo-light.svg'
											}
											alt='logo'
											width={50}
											height={50}
										/>
									)}
								</Link>
							</div>
							<button onClick={toggleMenu} className={styles.close_btn}>
								<X className='size-8 text-black dark:text-white' />
							</button>

							<m.div
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={{
									visible: {
										transition: {
											delayChildren: 0.1,
											staggerChildren: 0.05,
										},
									},
									hidden: {},
								}}
								className={cn(styles.open_inner, 'mt-20')}
							>
								{SIDEBAR_MENU.flatMap((section, sectionIndex) => [

									...section.items.map((item, itemIndex) => (
										<m.div
											key={`item-${sectionIndex}-${itemIndex}`}
											variants={{
												hidden: { opacity: 0, x: -20 },
												visible: { opacity: 1, x: 0 },
											}}
											transition={{ duration: 0.3, ease: 'easeInOut' }}
										>
											{item.href === '/logout' ? (
												<button
													onClick={() => {
														logout()
														toggleMenu()
													}}
													className={cn(
														styles.list_item,
														'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white'
													)}
												>
													<item.icon size={20} />
													<span>{item.label}</span>
												</button>
											) : (
												<Link
													onClick={toggleMenu}
													href={item.href}
													className={cn(
														styles.list_item,
														'text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white',
														pathname === item.href &&
															'text-black dark:text-white font-medium'
													)}
												>
													<item.icon size={20} />
													<span>{item.label}</span>
												</Link>
											)}
										</m.div>
									)),
								])}

								<m.div
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									className='mt-6'
								>
									<ModeToggle />
								</m.div>
							</m.div>
						</m.div>
					)}
				</AnimatePresence>
			</div>
		</LazyMotion>
	)
}
