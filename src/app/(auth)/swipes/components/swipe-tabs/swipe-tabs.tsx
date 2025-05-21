'use client'

import { useState } from 'react'
import SwipeLinks from '../swipe-links/swipe-links'
import Specialists from '../users-swipe/users-swipe'

export default function SwipeTabs() {
  const [activeTab, setActiveTab] = useState<'specialists' | 'projects'>('specialists')

  return (
		<>
			<SwipeLinks activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='w-full rounded-[30px] bg-background mt-12'>
				{activeTab === 'specialists' ? <Specialists /> : <p>projects</p>}
			</div>
		</>
	)
}