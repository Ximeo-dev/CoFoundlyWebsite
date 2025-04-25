import type { Metadata } from 'next'
import Register from './components/register'

export const metadata: Metadata = {
  title: 'Регистрация',
}

export default function RegisterPage() {
  return <Register />
  
}
