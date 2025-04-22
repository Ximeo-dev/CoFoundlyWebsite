'use client'

import { useProfileData } from '@/hooks/useProfileData'

export default function Profile() {
  const { userProfile, isLoading } = useProfileData()

  return (
    <div className='h-screen flex items-center justify-center'>{userProfile?.email}</div>
  )
}