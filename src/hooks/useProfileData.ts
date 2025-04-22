import { userService } from '@/services/user.service'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

export function useProfileData() {
  const {
    data: userProfile,
    isLoading,
    error
  } = useQuery<IUser>({
    queryKey: ['userProfile'],
    queryFn: () => userService.getUserProfile(),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false
  })

  return {
    userProfile,
    isLoading,
    error: error
  }
}