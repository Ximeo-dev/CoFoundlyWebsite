'use client'

import { cn } from '@/lib/utils'
import styles from './login-button.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

export default function LoginButton() {
	const { isAuthenticated } = useAuth()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

  return (
		<>
			{isAuthenticated && (
				<Link
					href={'/profile'}
					className='w-10 h-10 rounded-full border-2 border-[#3a3a3a] mr-6 hover:border-white/40 transition-colors duration-300'
				/>
			)}
			{!isAuthenticated && (
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