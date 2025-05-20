import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Home from '../home'
import ContainerWrapper from '@/components/layout/container/container-wrapper'

export const metadata: Metadata = {
  title: 'Добро пожаловать',
  ...NO_INDEX_PAGE
}

export default function WelcomePage() {
  return <ContainerWrapper>
    <Home />
  </ContainerWrapper>
}
