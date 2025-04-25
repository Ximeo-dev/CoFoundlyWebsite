import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import Settings from './components/profile-main'

export const metadata: Metadata = {
  title: 'Профиль',
  ...NO_INDEX_PAGE
}

export default function ProfilePage() {
  return (
		<ContainerWrapper>
      <Settings />
		</ContainerWrapper>
	)
}
