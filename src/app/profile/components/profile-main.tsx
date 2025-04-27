'use client'

import { useState } from 'react'
import SettingsSidebar from './profile-sidebar/profile-sidebar'
import ProfileInfo from './profile-info/profile-info'
import Settings from './security/security'
import Anket from './anket/my-anket/anket'
import styles from './profile.module.css'
import { cn } from '@/lib/utils'

export default function ProfileMain() {
  const [selected, setSelected] = useState('profile')

  const renderContent = () => {
    switch (selected) {
      case 'security':
        return <Settings />
      case 'my-form':
        return <Anket />
      case 'project-form':
        return <div>project-form</div>
      default:
        return <ProfileInfo />
    }
  }

  return (
		<div className={styles.profile_main}>
			<SettingsSidebar selected={selected} onSelect={setSelected} />
			<div
				className={cn(
					styles.profile_section,
					'dark:bg-[#151515] bg-white border dark:border-[#3a3a3a] border-[#d9d7d7]'
				)}
			>
				{renderContent()}
			</div>
		</div>
	)
}