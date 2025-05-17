import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Проекты',
  ...NO_INDEX_PAGE
}

export default function ProjectsChatsPage() {
  return <div>projects</div>
}
