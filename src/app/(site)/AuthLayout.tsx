import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <div></div>
    )
  }
}