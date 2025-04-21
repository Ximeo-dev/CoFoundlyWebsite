'use client'

import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useEffect, useState } from 'react'
import styles from './header.module.css'
import HeaderNav from './header-nav'
import { cn } from '@/lib/utils'
import MobileNav from './mobile/mobile-nav'
import { usePathname } from 'next/navigation'

export default function Header() {
  const scrollDirection = useScrollDirection()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const pathname = usePathname()

  useEffect(() => {
    if (scrollDirection === 'up') {
      setIsVisible(true)
    } else if (scrollDirection === 'down') {
      setIsVisible(false)
    }
  }, [scrollDirection])

  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 950)
    setIsMobile(window.innerWidth <= 950)
  }, [])

  if (pathname === '/login' || pathname === '/register' || pathname === '/reset-password') return null

  return (
		<>
			{isDesktop && (
				<header
					className={cn(
						styles.header,
						`fixed z-50 top-10 transition-all duration-500 bg-white dark:bg-[#1A1A1A] border border-[#D9D7D7] dark:border-[#3A3A3A] shadow-lg ${
							isVisible ? '-translate-y-0' : '-translate-y-28 overflow-hidden'
						}`
					)}
				>
					<HeaderNav />
				</header>
			)}
			{isMobile && <MobileNav />}
		</>
	)
}