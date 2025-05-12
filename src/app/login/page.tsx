import type { Metadata } from 'next'
import Login from './components/login'
import ContainerWrapper from '@/components/layout/container/container-wrapper'

export const metadata: Metadata = {
  title: 'Вход',
}

export default function LoginPage() {
  return <ContainerWrapper>
    <Login />
  </ContainerWrapper> 
  
}
