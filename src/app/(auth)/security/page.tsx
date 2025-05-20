import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Security from './components/security'

export const metadata: Metadata = {
  title: 'Безопасность',
  ...NO_INDEX_PAGE
}

export default function SecurityPage() {
  return (
		<Security />
	)
}
