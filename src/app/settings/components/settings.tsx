'use client'

import { useState } from 'react'
import SettingsSidebar from './settings-sidebar/settings-sidebar'
import SettingsProfile from './settings-profile/settings-profile'

export default function Settings() {
  const [selected, setSelected] = useState('profile')

  const renderContent = () => {
    switch (selected) {
      case 'subs':
        return <div>subs</div>
      case 'security':
        return <div>settings</div>
      default:
        return <SettingsProfile />
    }
  }

  return (
		<div className='pt-24 lg:pt-[150px] w-full min-h-screen'>
			<SettingsSidebar selected={selected} onSelect={setSelected} />
			<div className='lg:ml-[242px] dark:bg-[#151515] bg-white border dark:border-[#3a3a3a] border-[#d9d7d7] rounded-[15px] py-8 flex justify-center items-center'>{renderContent()}</div>
		</div>
	)
}