import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: '',
  ...NO_INDEX_PAGE
}

export default function SettingsPage() {
  return <div></div>
}
