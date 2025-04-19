'use client'

import { IMenuItem, MENU } from '@/constants/menu.constants'
import styles from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import LoginButton from '@/components/ui/login-button/login-button'

export default function HeaderNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image src={'/logo.svg'} alt='logo' width={50} height={50} /> 
      </div>
      <ul className={styles.nav_list}>
        {MENU.map((item: IMenuItem) => (
          <li key={item.id}>
            <Link className={styles.list_item} href={item.href || ''}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <LoginButton />
    </nav>
  )
}