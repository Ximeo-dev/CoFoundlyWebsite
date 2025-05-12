'use client'

import AnketView from '@/app/profile/components/user-anket/anket-view/anket-view'
import { swipeService } from '@/services/swipe.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/shadcn/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/shadcn/select'

export default function UsersSwipe() {
	const queryClient = useQueryClient()
	const [intent, setIntent] = useState<'similar' | 'complement'>('similar')
	const [currentAnket, setCurrentAnket] = useState<any>(null)
	const [remainingAnkets, setRemainingAnkets] = useState<any[]>([])

	const { data, refetch, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: ['swipe users', intent],
		queryFn: () => swipeService.swipeUsers(intent),
		enabled: false,
	})

	useEffect(() => {
		if (isSuccess && data) {
			if (data) {
				setCurrentAnket(data)
				setRemainingAnkets([])
			} else {
				setCurrentAnket(null)
				setRemainingAnkets([])
			}
		}
	}, [isSuccess, data])

	const { mutate: swipeAction } = useMutation({
		mutationFn: ({
			userId,
			action,
		}: {
			userId: string
			action: 'like' | 'skip'
		}) => swipeService.swipeAction(userId, action),
		onSuccess: () => {
			if (remainingAnkets.length > 0) {
				setCurrentAnket(remainingAnkets[0])
				setRemainingAnkets(remainingAnkets.slice(1))
			} else {
				refetch()
			}
		},
		onError: (error: any) => {
			toast.error(error.message || 'Не удалось выполнить действие')
		},
	})

	const handleIntentChange = (value: 'similar' | 'complement') => {
		setIntent(value)
		setCurrentAnket(null)
		setRemainingAnkets([])
		refetch()
	}

	const handleSwipeAction = (action: 'like' | 'skip') => {
		if (!currentAnket?.userId) {
			toast.error('Не удалось определить пользователя для действия')
			return
		}
		console.log(currentAnket?.userId)
		swipeAction({ userId: currentAnket.userId, action })
	}

	useEffect(() => {
		if (!currentAnket && remainingAnkets.length === 0 && !isLoading) {
			refetch()
		}
	}, [currentAnket, remainingAnkets, isLoading, refetch])

	return (
		<div className='p-4'>
			<div className='mb-4'>
				<label className='text-sm text-muted-foreground mr-2'>Ищу:</label>
				<Select onValueChange={handleIntentChange} defaultValue={intent}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Выберите тип поиска' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='similar'>Схожие</SelectItem>
						<SelectItem value='complement'>Дополняющие</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isLoading ? (
				<div className='text-center'>Загрузка анкеты...</div>
			) : isError ? (
				<div className='text-center text-red-500'>
					Ошибка: {error?.message || 'Не удалось загрузить анкеты'}
				</div>
			) : currentAnket ? (
				<div>
					<AnketView
						id={currentAnket.userId}
						showProgress={false}
						anket={currentAnket}
					/>
					<div className='flex justify-center gap-4 mt-4'>
						<Button variant='outline' onClick={() => handleSwipeAction('skip')}>
							Skip
						</Button>
						<Button variant='default' onClick={() => handleSwipeAction('like')}>
							Like
						</Button>
					</div>
				</div>
			) : (
				<div className='text-center'>Анкеты закончились</div>
			)}
		</div>
	)
}
