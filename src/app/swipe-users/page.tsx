import type { Metadata } from 'next'
import SwipeTabs from './components/swipe-tabs/swipe-tabs'

export const metadata: Metadata = {
  title: 'Исполнители',
}

export default function SwipeUsersPage() {
  return (
		<div className='mb-20 pb-16 sm:pb-0'>
			<SwipeTabs />
		</div>
	)
}
