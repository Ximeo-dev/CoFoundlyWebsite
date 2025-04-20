import ContainerWrapper from '@/components/layout/container/container-wrapper'
import type { Metadata } from 'next'
import Register from './components/register'

export const metadata: Metadata = {
  title: 'Регистрация',
}

export default function RegisterPage() {
  return <ContainerWrapper>
    <Register />
  </ContainerWrapper>
}
