import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import AnketPage from './components/user-anket/anket-page'

export const metadata: Metadata = {
  title: 'Главная',
  ...NO_INDEX_PAGE
}

export default function GeneralPage() {
  return <AnketPage />
}
