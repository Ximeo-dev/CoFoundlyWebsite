'use client'

import { useState } from 'react'
import SwipeLinks from '../swipe-links/swipe-links'

export default function SwipeTabs() {
  const [activeTab, setActiveTab] = useState<'specialists' | 'projects'>('specialists')

  return (
		<>
			<SwipeLinks activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='w-full rounded-[30px] bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] h-[700px] mt-12'>
				{activeTab === 'specialists' ? <p>specialists</p> : <p>projects</p>}
			</div>
		</>
	)
}