'use client'

import styles from './dropdown-profile.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { ResponseError } from '@/types/error.types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { childVariant, dropdownMobileVariants, dropdownVariants, itemVariants } from '@/lib/motion-variants'
import { useEffect, useRef, useState } from 'react'
import { toggleMenu } from '@/store/menu-store'
import { useAtom } from 'jotai'
import { CircleUserRound, LogOut, Settings } from 'lucide-react'
import Avatar from '@/app/profile/components/profile-info/avatar'

export default function DropdownProfile() {
  const queryClient = useQueryClient()
  const { setIsAuthenticated, setUser, user } = useAuth()

	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isMenuOpen, setMenuOpen] = useAtom(toggleMenu)

	const dropdownRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLDivElement>(null)

	const { isAuthenticated } = useAuth()

	const handleClickOutside = (event: any) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target)
		) {
			setDropdownOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])
 
  const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			setIsAuthenticated(false)
			setUser(null)
			queryClient.setQueryData(['userProfile'], null)
			window.location.href = '/'
		},
		onError: (error: ResponseError) => {
			toast.error('Что-то пошло не так')
			console.log(error)
		},
	})

  return (
		<div
			ref={buttonRef}
			onClick={
				isAuthenticated ? () => setDropdownOpen(!dropdownOpen) : undefined
			}
			className={cn(isAuthenticated ? styles.dropdown : '')}
		>
			<Avatar size={64} />
			<AnimatePresence>
				{dropdownOpen && (
					<>
						<motion.div
							ref={dropdownRef}
							initial='hidden'
							animate='visible'
							exit='exit'
							variants={dropdownVariants}
							className={cn(
								styles.dropdown_block,
								'bg-white dark:bg-[#1A1A1A] border border-border hidden lg:block'
							)}
							onClick={(event: any) => event.stopPropagation()}
						>
							<motion.div
								className={styles.dropdown_content}
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={{
									visible: { transition: { staggerChildren: 0.08 } },
								}}
							>
								<motion.div variants={itemVariants}>
									<Link
										href={isAuthenticated ? '/profile' : '/login'}
										onClick={() => {
											setMenuOpen(false)
											setDropdownOpen(false)
										}}
										className={cn(styles.dropdown_link, 'group')}
									>
										<CircleUserRound
											size={15}
											className={cn(
												styles.dropdown_icon,
												'group-hover:opacity-100 opacity-0 transition-all duration-300'
											)}
										/>
										<span className="relative transition-all duration-300 after:content-[''] after:absolute after:top-[105%] after:h-[1px] after:left-0 after:w-0 after:transition-all after:duration-300 after:bg-black dark:after:bg-white group-hover:opacity-100 visible group-hover:after:w-[100%] group-hover:ml-5 select-none">
											Профиль
										</span>
									</Link>
								</motion.div>

								<motion.div variants={itemVariants}>
									<Link
										href='/profile'
										onClick={() => {
											setMenuOpen(false)
											setDropdownOpen(false)
										}}
										className={cn(styles.dropdown_link, 'group')}
									>
										<Settings
											size={15}
											className={cn(
												styles.dropdown_icon,
												'group-hover:opacity-100 opacity-0 transition-all duration-300'
											)}
										/>
										<span className="relative transition-all duration-300 after:content-[''] after:absolute after:top-[105%] after:h-[1px] after:left-0 after:w-0 after:transition-all after:duration-300 after:bg-black dark:after:bg-white group-hover:opacity-100 visible group-hover:after:w-[100%] group-hover:ml-5 select-none">
											Настройки
										</span>
									</Link>
								</motion.div>

								<motion.div variants={itemVariants}>
									<button
										onClick={() => logout()}
										className='relative inline-flex transition-opacity border-none outline-none bg-transparent p-0 whitespace-nowrap group items-center cursor-pointer'
									>
										<LogOut
											size={15}
											className='absolute opacity-0 transition-all duration-300 group-hover:opacity-100'
										/>
										<span className='relative transition-all duration-300 after:content-[""] after:absolute after:top-[105%] after:h-[1px] after:left-0 after:w-0 after:transition-all after:duration-300 after:bg-black dark:after:bg-white group-hover:opacity-100 visible group-hover:after:w-[100%] group-hover:ml-5 select-none'>
											Выйти
										</span>
									</button>
								</motion.div>
							</motion.div>
						</motion.div>

						<motion.div
							ref={dropdownRef}
							variants={dropdownMobileVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
							className={cn(
								styles.dropdown_block_mobile,
								'bg-background border border-border'
							)}
							onClick={(event: any) => event.stopPropagation()}
						>
							<motion.div variants={childVariant}>
								<Link
									href={isAuthenticated ? '/profile' : '/login'}
									onClick={() => {
										setMenuOpen(false)
										setDropdownOpen(false)
									}}
									className='text-sm font-medium'
								>
									<CircleUserRound size={20} />
								</Link>
							</motion.div>

							<motion.div variants={childVariant}>
								<Link
									href='/profile'
									onClick={() => {
										setMenuOpen(false)
										setDropdownOpen(false)
									}}
									className='text-sm font-medium'
								>
									<Settings size={20} />
								</Link>
							</motion.div>

							<motion.div variants={childVariant}>
								<button
									onClick={() => logout()}
									className='text-sm font-medium'
								>
									<LogOut size={20} />
								</button>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}