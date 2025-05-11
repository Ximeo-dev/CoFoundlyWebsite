import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Чат',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <p>Здесь будет чат</p>
}
