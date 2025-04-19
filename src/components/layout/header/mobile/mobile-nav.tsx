'use client'

import styles from './mobile-nav.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser, House, Menu } from 'lucide-react'
import { ENPOINTS } from '@/config/endpoints.config'

export default function MobileNav() {
  const pathname = usePathname()

	return (
		<header className={styles.menu}>
			<nav className={styles.menu_nav}>
				<ul className={styles.menu_list}>
					<li>
						<Link href={ENPOINTS.HOME}>
							<House
								className={`size-7 ${
									pathname === ENPOINTS.HOME ? 'text-violet-300' : 'text-white'
								}`}
							/>
						</Link>
					</li>
					<li>
						<Link href={ENPOINTS.HOME}>
							<Menu className={`size-7 text-white`} />
						</Link>
					</li>
					<li>
						<Link href={ENPOINTS.PROFILE}>
							<CircleUser
								className={`size-7 ${
									pathname === ENPOINTS.PROFILE
										? 'text-violet-300'
										: 'text-white'
								}`}
							/>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}