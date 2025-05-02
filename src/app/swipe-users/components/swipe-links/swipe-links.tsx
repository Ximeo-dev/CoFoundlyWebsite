'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { TABS } from '@/constants/menu.constants'

type ISwipeLinks = {
	activeTab: 'specialists' | 'projects'
	setActiveTab: (tab: 'specialists' | 'projects') => void
}

export default function SwipeLinks({ activeTab, setActiveTab }: ISwipeLinks) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [hoveredPosition, setHoveredPosition] = useState<number>(0)
	const [hoveredWidth, setHoveredWidth] = useState<number>(0)

	return (
		<LazyMotion features={domAnimation}>
			<div className='flex justify-center pt-14 sm:pt-[80px] md:pt-[120px] lg:pt-[110px] xl:pt-[160px] select-none'>
				<m.div
					initial={{ opacity: 0, y: -25 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className='relative flex rounded-[20px] py-2 bg-white dark:bg-[#1A1A1A] border border-border'
				>
					<div
						className={clsx(
							'hidden lg:block absolute top-0 left-0 h-[60px] bg-zinc-100 dark:bg-neutral-800 rounded-[20px] transition-all duration-200 ease-in-out z-0',
							hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
						)}
						style={{
							width: `${hoveredWidth}px`,
							transform: `translateX(${hoveredPosition}px)`,
						}}
					/>

					<ul className='relative z-10 flex'>
						{TABS.map((tab, index) => (
							<li
								key={tab.id}
								className='relative'
								onMouseEnter={e => {
									const { offsetLeft, offsetWidth } = e.currentTarget
									setHoveredIndex(index)
									setHoveredPosition(offsetLeft)
									setHoveredWidth(offsetWidth)
								}}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<button
									onClick={() =>
										setActiveTab(tab.id as 'specialists' | 'projects')
									}
									className={clsx(
										'cursor-pointer md:px-5 md:py-2 px-3.5 py-1.5 rounded-[20px] text-base lg:text-lg transition-colors duration-300 whitespace-nowrap',
										activeTab === tab.id
											? 'text-black dark:text-white'
											: 'text-neutral-500 dark:text-[#939393] hover:text-black dark:hover:text-white'
									)}
								>
									{tab.label}
								</button>
							</li>
						))}
					</ul>
				</m.div>
			</div>
		</LazyMotion>
	)
}
