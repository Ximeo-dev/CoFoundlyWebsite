'use client'

import { ENDPOINTS } from '@/config/endpoints.config'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import styles from './sidebar.module.css'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'
import { SIDEBAR_MENU } from '@/constants/menu.constants'
import { usePathname } from 'next/navigation'
import { Moon } from 'lucide-react'

interface ISidebar {
  selected: string
  onSelect: (id: string) => void
}

export default function Sidebar({
  selected,
  onSelect
}: ISidebar) {
  const { resolvedTheme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
		<aside className={cn('border-r border-border bg-background', styles.sidebar)}>
			<Link href={ENDPOINTS.HOME} className={styles.logo}>
        {isMounted && (
          <Image
            priority
            src={resolvedTheme === 'dark' ? '/logo.svg' : '/logo-light.svg'}
            alt='logo'
            width={50}
            height={50}
          />
        )}
			</Link>
      <ul>
        {SIDEBAR_MENU.map((item) => {
          const handleClick = () => {
            onSelect(item.id)
          }

          const isActive = selected === item.id

          return (
						<li
							key={item.id}
							onClick={handleClick}
						>
							<item.icon size={27} />
						</li>
					)
        })}
      </ul>
      <Moon />
		</aside>
	)
}