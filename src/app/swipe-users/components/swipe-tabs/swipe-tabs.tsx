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
			<div className='w-full rounded-[30px] bg-background border border-border mt-12'>
				{activeTab === 'specialists' ? <Specialists /> : <p>projects</p>}
			</div>
		</>
	)
}