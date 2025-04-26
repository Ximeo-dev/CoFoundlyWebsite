'use client'

import { usePathname } from 'next/navigation'
import ContainerWrapper from '../container/container-wrapper'
import FooterNav from './footer-nav'
import styles from './footer.module.css'

export default function Footer() {
	const pathname = usePathname()
	
	if (
		pathname === '/login' ||
		pathname === '/register' ||
		pathname === '/reset-password'
	)
		return null


  return (
		<footer
			className={styles.footer_block}
		>
			<FooterNav />
		</footer>
	)
}