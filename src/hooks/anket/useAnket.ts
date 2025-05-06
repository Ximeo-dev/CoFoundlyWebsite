import { useQuery } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { IAnket } from '@/types/anket.types'

export const useAnketQuery = () =>
	useQuery<IAnket | null>({
		queryKey: ['anket'],
		queryFn: () => anketService.getAnket(),
		staleTime: 1000 * 60 * 5,
	})
