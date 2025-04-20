'use client'

import Link from 'next/link'
import { FC } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { IMenuItem, MENU_MORE } from '@/constants/menu.constants'
import { ModeToggle } from '@/components/ui/theme-toggle/theme-toggle'

const More: FC = () => {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				className='rounded-[20px] shadow-lg bg-white dark:bg-[#1A1A1A] border border-[#D9D7D7] dark:border-[#3A3A3A] z-50'
				initial={{ y: 20 }}
				animate={{ y: 57 }}
				transition={{ type: 'spring', stiffness: 210, damping: 17 }}
			>
				<ul className='flex flex-col gap-y-4 p-4'>
					{MENU_MORE.map((item: IMenuItem) => (
						<li key={item.id}>
							<Link
								href={item.href}
								className='text-base text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white font-medium transition-colors duration-300'
							>
								{item.label}
							</Link>
						</li>
					))}
					<ModeToggle />
				</ul>
			</m.div>
		</LazyMotion>
	)
}

export default More
