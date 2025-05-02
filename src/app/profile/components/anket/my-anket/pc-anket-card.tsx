'use client'

import { anketService } from '@/services/anket.service'
import { IAnketRequest } from '@/types/anket.types'
import { useMutation } from '@tanstack/react-query'
import Avatar from '../../profile-info/avatar'

export default function PcAnketCard() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['create anket'],
		mutationFn: (data: IAnketRequest) => anketService.createAnket(data)
	})

	return (
		<div className='hidden md:flex flex-col h-[500px]'>
			<div className='w-full border-b border-border px-10 py-2'>fas</div>
			<div className='flex w-full h-full'>
				<div className='w-[45%] h-full flex items-center border-r border-border px-5 py-'>
					{/* <Avatar size={512} /> */}
				</div>
				<div className='w-1/2 h-full flex px-5 py-'>
					fdsfasf
				</div>
			</div>
		</div>
	)
}