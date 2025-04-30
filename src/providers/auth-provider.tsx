'use client'

import { userService } from '@/services/user.service'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type AuthContextType = {
	isAuthenticated: boolean
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	isEmailConfirmed: boolean
	setIsEmailConfirmed: Dispatch<SetStateAction<boolean>>
	user: IUser | null
	setUser: Dispatch<SetStateAction<any>>
	isLoading: boolean
	refetchProfile: () => void
	avatarVersion: number
	setAvatarVersion: Dispatch<SetStateAction<number>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
	const [user, setUser] = useState<IUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [avatarVersion, setAvatarVersion] = useState(Date.now())

	const {
		data: userProfile,
		error,
		refetch,
	} = useQuery({
		queryKey: ['userProfile'],
		queryFn: () => userService.getUserProfile(),
		staleTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		retry: false,
	})

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
      setIsLoading(false)
		} else {
			setUser(userProfile)
			setIsEmailConfirmed(userProfile.securitySettings.isEmailConfirmed)
			setIsAuthenticated(true)
		}
    setIsLoading(false)
	}, [userProfile, error])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				isEmailConfirmed,
				setIsEmailConfirmed,
				user,
				setUser,
				isLoading,
				refetchProfile: refetch,
				avatarVersion,
				setAvatarVersion
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}