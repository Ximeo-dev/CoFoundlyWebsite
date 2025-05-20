'use client'

import { usePathname } from 'next/navigation'
// import FooterNav from './footer-nav'
import styles from './footer.module.css'

export default function Footer() {
	const pathname = usePathname()
	
	if (
		pathname === '/login' ||
		pathname === '/register' ||
		pathname === '/reset-password' ||
		pathname === '/chats'
	)
		return null


  return (
		<footer
			className={styles.footer_block}
		>
			{/* <FooterNav /> */}
		</footer>
	)
}