import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import ProjectMain from './components/project-main'

export const metadata: Metadata = {
  title: 'Проекты',
  ...NO_INDEX_PAGE
}

export default function ProjectsPage() {
  return <ProjectMain />
}
