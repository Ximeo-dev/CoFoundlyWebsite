'use client'

import { anketService } from '@/services/anket.service'
import { IAnketRequest } from '@/types/anket.types'
import { useMutation } from '@tanstack/react-query'

export default function PcAnketCard() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['create anket'],
		mutationFn: (data: IAnketRequest) => anketService.createAnket(data)
	})

	return (
		<div className='hidden: md:block'>anket-card</div>
	)
}