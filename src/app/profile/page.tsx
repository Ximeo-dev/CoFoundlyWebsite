import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import Profile from './components/Profile'
import { EmailConfirmationNotification } from '@/components/layout/email-confirmation/email-confirmation-notification'

export const metadata: Metadata = {
  title: 'Профиль',
  ...NO_INDEX_PAGE
}

export default function ProfilePage() {
  return <ContainerWrapper>
    <Profile />
		<EmailConfirmationNotification />
  </ContainerWrapper>
}
