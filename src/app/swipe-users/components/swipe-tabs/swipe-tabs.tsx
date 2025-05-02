'use client'

import { useEffect, useState } from 'react'
import SwipeLinks from '../swipe-links/swipe-links'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Specialists from '../specialists/specialists'

export default function SwipeTabs() {
  const [activeTab, setActiveTab] = useState<'specialists' | 'projects'>('specialists')
	const [isShowTooltip, setIsShowTooltip] = useState<boolean>(true)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft':
					console.log('skip')
					break
				case 'ArrowRight':
					console.log('match')
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

  return (
		<>
			<SwipeLinks activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='w-full rounded-[30px] bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] mt-12'>
				{activeTab === 'specialists' ? <Specialists /> : <p>projects</p>}
			</div>
			<div className='hidden lg:flex mt-8 w-full items-center justify-center'>
			{isShowTooltip && (
				<ul className='flex items-center justify-center gap-x-12 rounded-[20px] bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] px-4 py-2.5'>
					<li className='flex items-center gap-x-2'>
						<ArrowLeft className='w-5 h-5' />
						<span>Скип</span>
					</li>
					<li className='flex items-center gap-x-2'>
						<ArrowRight className='w-5 h-5' />
						<span>Мэтч</span>
					</li>
				</ul>
			)}
				<button className='ml-20 bg-black dark:bg-white text-white dark:text-black rounded-lg px-2.5 py-1.5 cursor-pointer' onClick={() => setIsShowTooltip(!isShowTooltip)}>{isShowTooltip ? 'Скрыть' : 'Управление клавиатурой'}</button>
			</div>
		</>
	)
}