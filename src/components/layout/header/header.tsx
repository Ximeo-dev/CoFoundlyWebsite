'use client'

import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useEffect, useState } from 'react'
import styles from './header.module.css'
import HeaderNav from './header-nav'
import { cn } from '@/lib/utils'
import MobileNav from './mobile/mobile-nav'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const scrollDirection = useScrollDirection()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (scrollDirection === 'up') {
      setIsVisible(true)
    } else if (scrollDirection === 'down') {
      setIsVisible(false)
    }
  }, [scrollDirection])

  if (isAuthenticated) return null

  return (
		<>
      <header
        className={cn(
          styles.header,
          `fixed z-20 top-10 transition-all duration-500 bg-white dark:bg-[#1A1A1A] border border-border shadow-xs hidden lg:block ${
            isVisible ? '-translate-y-3' : '-translate-y-32 overflow-hidden'
          }`
        )}
      >
        <HeaderNav />
      </header>
			<MobileNav />
		</>
	)
}