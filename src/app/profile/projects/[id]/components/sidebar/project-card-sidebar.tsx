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
					className={`cursor-pointer flex items-center space-x-3 p-2 rounded-md transition-colors duration-300 ${
						activeTab === 'participants'
							? 'text-white'
							: 'text-neutral-400 hover:text-neutral-200'
					}`}
				>
					<Users className='w-5 h-5' />
					<span>Участники</span>
				</button>
				<button
					onClick={() => handleTabChange('settings')}
					className={`cursor-pointer flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${
						activeTab === 'settings'
							? 'text-white'
							: 'text-neutral-400 hover:text-neutral-200'
					}`}
				>
					<Settings className='w-5 h-5' />
					<span>Настройки</span>
				</button>
			</nav>
		</div>
	)
}