import { anketService } from '@/services/anket.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  const { data: anket, isLoading } = useQuery({
		queryKey: ['anket'],
		queryFn: () => anketService.getAnket(),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		retry: 1,
	})

  return { anket, isLoading }
}