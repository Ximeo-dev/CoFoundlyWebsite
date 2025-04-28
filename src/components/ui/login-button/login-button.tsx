'use client'

import { cn } from '@/lib/utils'
import styles from './login-button.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import DropdownProfile from '../dropdown-profile/dropdown-profile'

export default function LoginButton() {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return null

	return (
		<>
			{isAuthenticated ? (
				<DropdownProfile />
			) : (
				<Link href={'/login'} className={cn(styles.button, 'group')}>
					<div className='relative overflow-hidden'>
						<p className='group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] text-lg'>
							Войти
						</p>
						<p className='absolute top-7 left-0 group-hover:top-0 duration-[0.900s] ease-[cubic-bezier(0.19,1,0.22,1)] text-lg'>
							Войти
						</p>
					</div>
				</Link>
			)}
		</>
	)
}
