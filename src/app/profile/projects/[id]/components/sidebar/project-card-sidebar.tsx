'use client'

import { useState } from 'react'
import { Users, Settings } from 'lucide-react'

interface IProjectSidebar {
	onTabChange: (tab: 'participants' | 'settings') => void
}

export default function ProjectSidebar({ onTabChange }: IProjectSidebar) {
	const [activeTab, setActiveTab] = useState<'participants' | 'settings'>(
		'participants'
	)

	const handleTabChange = (tab: 'participants' | 'settings') => {
		setActiveTab(tab)
		onTabChange(tab)
	}

	return (
		<div className='h-full text-white p-4 flex flex-col border-r border-border'>
			<h2 className='text-xl font-semibold mb-6'>Панель управления</h2>
			<nav className='flex flex-col space-y-2'>
				<button
					onClick={() => handleTabChange('participants')}
					className={`flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${
						activeTab === 'participants'
							? 'bg-neutral-600 text-white'
							: 'text-gray-400 hover:bg-neutral-600'
					}`}
				>
					<Users className='w-5 h-5' />
					<span>Участники</span>
				</button>
				<button
					onClick={() => handleTabChange('settings')}
					className={`flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${
						activeTab === 'settings'
							? 'bg-neutral-600 text-white'
							: 'text-gray-400 hover:bg-neutral-600'
					}`}
				>
					<Settings className='w-5 h-5' />
					<span>Настройки</span>
				</button>
			</nav>
		</div>
	)
}