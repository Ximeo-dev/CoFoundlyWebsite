'use client'

import styles from './mobile-nav.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser, House, Menu, X } from 'lucide-react'
import { ENPOINTS } from '@/config/endpoints.config'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import * as motion from 'motion/react-client'
import { MENU_MORE } from '@/constants/menu.constants'
import Image from 'next/image'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const pathname = usePathname()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleMenu = () => setIsOpen(!isOpen)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	return (
		<header
			className={cn(
				styles.menu,
				'border-t border-t-[#D9D7D7] dark:border-t-[#3a3a3a]	'
			)}
		>
			<nav className={styles.menu_nav}>
				<ul className={styles.menu_list}>
					<li>
						<Link href={ENPOINTS.HOME}>
							<House className={`size-7 text-black dark:text-white`} />
						</Link>
					</li>
					<li>
						<button onClick={toggleMenu}>
							<Menu className='size-7 text-black dark:text-white mt-1.5' />
						</button>
					</li>
					<li>
						<Link href={ENPOINTS.LOGIN}>
							<CircleUser className={`size-7 text-black dark:text-white`} />
						</Link>
					</li>
				</ul>
			</nav>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
						exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 z-50 flex flex-col mt gap-8 backdrop-blur-lg bg-black/50'
					>
						<button className='absolute top-4 left-6'>
							<Image src={'/logo.svg'} alt='logo' width={50} height={50} />
						</button>
						<button onClick={toggleMenu} className='absolute top-6 right-6'>
							<X className='size-8 text-black dark:text-white' />
						</button>

						<motion.div
							initial='hidden'
							animate='visible'
							exit='hidden'
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.12,
									},
								},
								hidden: {},
							}}
							className='flex flex-col gap-8 px-5 sm:px-10 mt-28'
						>
							{MENU_MORE.map((item, index) => (
								<motion.div
									key={index}
									variants={{
										hidden: { opacity: 0, x: -50 },
										visible: { opacity: 1, x: 0 },
									}}
									transition={{ duration: 0.4, ease: 'easeInOut' }}
									className='border border-[#D9D7D7] dark:border-[#3a3a3a] rounded-[15px] bg-white dark:bg-[#151515] p-3'
								>
									<Link
										onClick={toggleMenu}
										href={item.href}
										className='text-black dark:text-white text-lg flex items-center gap-3'
									>
										{item.label}
									</Link>
								</motion.div>
							))}
							<motion.div
								variants={{
									hidden: { opacity: 0, x: -50 },
									visible: { opacity: 1, x: 0 },
								}}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
							>
								<ModeToggle />
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}