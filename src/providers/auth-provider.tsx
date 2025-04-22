'use client'

import { useProfileData } from '@/hooks/useProfileData'
import { IUser } from '@/types/user.types'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type AuthContextType = {
	isAuthenticated: boolean
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	isEmailConfirmed: boolean
	setIsEmailConfirmed: Dispatch<SetStateAction<boolean>>
	user: IUser | null
	setUser: Dispatch<SetStateAction<any>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)

  const { userProfile, error } = useProfileData()

  const clearAuthState = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (!userProfile) {
      clearAuthState()
    }
  }, [])

  useEffect(() => {
    if (error || !userProfile) {
      clearAuthState()
    } else {
      setUser(userProfile)
      setIsEmailConfirmed(userProfile.securitySettings.isEmailConfirmed)
      setIsAuthenticated(true)
    }
  }, [userProfile, error])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isEmailConfirmed,
        setIsEmailConfirmed,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}