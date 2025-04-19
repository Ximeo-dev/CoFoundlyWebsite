'use client'

import Link from 'next/link'
import { FC } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { IMenuItem, MENU_MORE } from '@/constants/menu.constants'

const More: FC = () => {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				className='rounded-[20px] bg-[#1A1A1A] border border-[#3a3a3a] z-50'
				initial={{ y: 20 }}
				animate={{ y: 57 }}
				transition={{ type: 'spring', stiffness: 210, damping: 17 }}
			>
				<ul className='flex flex-col gap-y-4 p-4'>
					{MENU_MORE.map((item: IMenuItem) => (
						<li key={item.id}>
							<Link
								href={item.href}
								className='text-base text-[#939393] font-medium hover:text-white transition-colors duration-300'
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</m.div>
		</LazyMotion>
	)
}

export default More
