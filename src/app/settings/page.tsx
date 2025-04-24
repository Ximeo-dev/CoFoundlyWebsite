import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import Settings from './components/settings'

export const metadata: Metadata = {
  title: 'Настройки',
  ...NO_INDEX_PAGE
}

export default function SettingsPage() {
  return (
		<ContainerWrapper>
      <Settings />
		</ContainerWrapper>
	)
}
