import type { Metadata } from 'next'
import SwipeTabs from './components/swipe-tabs/swipe-tabs'

export const metadata: Metadata = {
  title: 'Исполнители',
}

export default function SwipeUsersPage() {
  return (
		<div className='min-h-screen mb-10'>
			<SwipeTabs />
		</div>
	)
}
