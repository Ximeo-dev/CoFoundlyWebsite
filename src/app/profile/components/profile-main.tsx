'use client'

import { useState } from 'react'
import SettingsSidebar from './profile-sidebar/profile-sidebar'
import ProfileInfo from './profile-info/profile-info'
import Settings from './settings/settings'

export default function ProfileMain() {
  const [selected, setSelected] = useState('profile')

  const renderContent = () => {
    switch (selected) {
      case 'security':
        return <Settings />
      case 'my-form':
        return <div>my-form</div>
      case 'project-form':
        return <div>project-form</div>
      default:
        return <ProfileInfo />
    }
  }

  return (
		<div className='pb-14 pt-20 lg:pb-[70px] lg:pt-[130px] w-full min-h-screen'>
			<SettingsSidebar selected={selected} onSelect={setSelected} />
			<div className='lg:ml-[242px] dark:bg-[#151515] bg-white border dark:border-[#3a3a3a] border-[#d9d7d7] rounded-[15px] py-8 flex justify-center items-center'>{renderContent()}</div>
		</div>
	)
}