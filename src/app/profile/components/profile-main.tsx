'use client'

import { useState } from 'react'
import SettingsSidebar from './profile-sidebar/profile-sidebar'
import Settings from './security/security'
import styles from './profile.module.css'
import { cn } from '@/lib/utils'
import AnketPage from './user-anket/anket-page'
import { EmailConfirmationNotification } from '@/components/layout/email-confirmation/email-confirmation-notification'

export default function ProfileMain() {
  const [selected, setSelected] = useState('my-anket')

  const renderContent = () => {
    switch (selected) {
			case 'security':
				return <Settings />
			case 'my-anket':
				return <AnketPage />
			case 'project-anket':
				return <div>project-form</div>
			default:
				return <AnketPage />
		}
  }

  return (
		<div className={styles.profile_main}>
			<SettingsSidebar selected={selected} onSelect={setSelected} />
			<div
				className={cn(
					styles.profile_section,
					'bg-background border'
				)}
			>
				{renderContent()}
			</div>
      <EmailConfirmationNotification />
		</div>
	)
}