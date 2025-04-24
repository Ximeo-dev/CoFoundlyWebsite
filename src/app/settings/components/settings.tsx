'use client'

import { useState } from 'react'
import SettingsSidebar from './settings-sidebar'
import SettingsProfile from './settings-profile'

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
		<div className='min-h-screen pt-14 sm:pt-[80px] md:pt-[120px] lg:pt-[110px] xl:pt-[160px] w-full'>
			<SettingsSidebar selected={selected} onSelect={setSelected} />
			<div className='pl-52 w-full'>{renderContent()}</div>
		</div>
	)
}