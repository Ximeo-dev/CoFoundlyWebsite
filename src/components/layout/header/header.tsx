'use client'

import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'
import HeaderNav from './header-nav'
import { cn } from '@/lib/utils'

export default function Header() {
  const scrollDirection = useScrollDirection()
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    if (scrollDirection === 'up') {
      setIsVisible(true)
    } else if (scrollDirection === 'down') {
      setIsVisible(false)
    }
  }, [scrollDirection])

  return (
		<header className={cn(styles.header, `fixed z-50 top-10 transition-all duration-500 ${
      isVisible ? '-translate-y-0' : '-translate-y-28 overflow-hidden'
    }`)}>
			<HeaderNav />
		</header>
	)
}