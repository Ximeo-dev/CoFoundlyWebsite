'use client'

import { SETTINGS_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ISettingsContent {
	currentType: string
	setCurrentType: (type: string) => void
}

export default function SettingsLinks({ currentType, setCurrentType }: ISettingsContent) {
  const handleCurrentType = (name: string) => {
    setCurrentType(name)
  }
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredPosition, setHoveredPosition] = useState<number>(0)
  const [hoveredWidth, setHoveredWidth] = useState<number>(0)

  return (
		<div>
			<div className='relative mt-8 md:mt-10 rounded-lg border border-white/[0.2] shadow bg-[#09090B]'>
				<div
					className={cn(
						'hidden lg:block absolute h-10 bg-[#151515] rounded-[15px] transition-all duration-300',
						hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
					)}
					style={{
						width: `${hoveredWidth}px`,
						transform: `translateX(${hoveredPosition}px)`,
					}}
				></div>
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:flex'>
					{SETTINGS_MENU.map((item, i) => (
						<li
							key={item.id}
							className='relative px-4 py-2 cursor-pointer text-white lg:text-neutral-300/80 hover:text-white whitespace-nowrap'
							onMouseEnter={e => {
								const { offsetLeft, offsetWidth } = e.currentTarget
								setHoveredIndex(i)
								setHoveredPosition(offsetLeft)
								setHoveredWidth(offsetWidth)
							}}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => handleCurrentType(item.label)}
						>
							<button
								className={cn(
									'relative transition-all duration-300',
									currentType === item.label
										? 'Welcome-text font-extrabold border-none'
										: ''
								)}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
			<h1 className='pt-16 text-center text-3xl sm:text-6xl font-semibold'>
				{currentType}
			</h1>
		</div>
	)
}