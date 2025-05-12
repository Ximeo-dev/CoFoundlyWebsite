'use client'

import AnketView from '@/app/profile/components/user-anket/anket-view/anket-view'
import { swipeService } from '@/services/swipe.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/shadcn/button'

import SkeletonView from '@/app/profile/components/user-anket/anket-view/skeleton-view'

export default function UsersSwipe() {
	const [intent, setIntent] = useState<'similar' | 'complement'>('similar')
	const [currentAnket, setCurrentAnket] = useState<any>(null)
	const [remainingAnkets, setRemainingAnkets] = useState<any[]>([])
	const [isResetting, setIsResetting] = useState(false)

	const { data, refetch, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: ['swipe users', intent],
		queryFn: () => swipeService.swipeUsers(intent),
		enabled: false,
	})

	useEffect(() => {
		if (isSuccess && data) {
			if (data?.userId) {
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

	const { mutate: resetSwipe } = useMutation({
		mutationFn: () => swipeService.resetSwipe(),
		onSuccess: () => {
			toast.success('История свайпов сброшена')
			setCurrentAnket(null)
			setRemainingAnkets([])
			refetch()
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to reset swipe history')
		},
	})

	const handleIntentChange = (value: 'similar' | 'complement') => {
		setIntent(value)
		setCurrentAnket(null)
		setRemainingAnkets([])
		setTimeout(() => {
			refetch()
		}, 300)
	}

	const handleSwipeAction = (action: 'like' | 'skip') => {
		if (!currentAnket?.userId) {
			toast.error('Не удалось определить пользователя для действия')
			return
		}
		swipeAction({ userId: currentAnket.userId, action })
	}

	const handleResetSwipe = () => {
		setIsResetting(true)
		resetSwipe()
		setIsResetting(false)
	}

	useEffect(() => {
		if (!currentAnket && remainingAnkets.length === 0 && !isLoading) {
			refetch()
		}
	}, [currentAnket, remainingAnkets, isLoading, refetch])

	return (
		<div className=''>
			{isLoading ? (
				<SkeletonView />
			) : isError ? (
				<div className='text-center text-red-500'>
					Ошибка: {error?.message || 'Не удалось загрузить анкеты'}
				</div>
			) : currentAnket?.userId ? (
				<div>
					<AnketView
						key={currentAnket.userId}
						id={currentAnket.userId}
						showProgress={false}
						anket={currentAnket}
						editable={false}
						intent={intent}
						handleIntentChange={handleIntentChange}
						handleSwipeAction={handleSwipeAction}
					/>
				</div>
			) : (
				<div className='h-[550px]'>
					<div className='flex items-center justify-center h-full flex-col gap-y-4'>
						<div className='text-center'>Анкеты закончились</div>
						<Button
							variant='outline'
							onClick={handleResetSwipe}
							disabled={isResetting}
						>
							Сбросить историю свайпов
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
