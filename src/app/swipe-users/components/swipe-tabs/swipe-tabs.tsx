'use client'

import { useEffect, useState } from 'react'
import SwipeLinks from '../swipe-links/swipe-links'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Specialists from '../specialists/specialists'

export default function SwipeTabs() {
  const [activeTab, setActiveTab] = useState<'specialists' | 'projects'>('specialists')

  return (
		<>
			<SwipeLinks activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='w-full rounded-[30px] bg-background border border-border mt-12'>
				{activeTab === 'specialists' ? <Specialists /> : <p>projects</p>}
			</div>
		</>
	)
}