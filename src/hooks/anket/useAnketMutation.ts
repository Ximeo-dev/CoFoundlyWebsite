import { useMutation, useQueryClient } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { IAnketRequest, IAnket } from '@/types/anket.types'

export const useAnketMutation = (isEdit: boolean) => {
	const queryClient = useQueryClient()

	return useMutation<IAnket, Error, IAnketRequest>({
		mutationFn: data =>
			isEdit ? anketService.editAnket(data) : anketService.createAnket(data),
		onSuccess: data => {
			queryClient.setQueryData(['anket'], data)
		},
	})
}
