'use client'

import AnketView from '@/app/profile/components/user-anket/anket-view/anket-view'
import { swipeService } from '@/services/swipe.service'
import { chatService } from '@/services/chat.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/shadcn/button'
import SkeletonView from '@/app/profile/components/user-anket/anket-view/skeleton-view'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent, IChat } from '@/types/chat.types'

export default function UsersSwipe() {
	const [intent, setIntent] = useState<'similar' | 'complement'>('similar')
	const [currentAnket, setCurrentAnket] = useState<any>(null)
	const [remainingAnkets, setRemainingAnkets] = useState<any[]>([])
	const [isResetting, setIsResetting] = useState(false)
	const socket = useSocket()
	const queryClient = useQueryClient()

	const { data, refetch, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: ['swipe users', intent],
		queryFn: () => swipeService.swipeUsers(intent),
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
		onSuccess: async () => {
			if (remainingAnkets.length > 0) {
				setCurrentAnket(remainingAnkets[0])
				setRemainingAnkets(remainingAnkets.slice(1))
			} else {
				const result = await refetch()
				if (!result.data?.userId) {
					setCurrentAnket(null)
					setRemainingAnkets([])
				}
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
			setIsResetting(false)
			refetch()
		},
		onError: (error: any) => {
			console.error('[UsersSwipe] Ошибка при сбросе свайпов:', error)
			toast.error(error.message || 'Failed to reset swipe history')
			setIsResetting(false)
		},
	})

	useEffect(() => {
		console.log('[UsersSwipe] Устанавливаю обработчик NEW_CHAT')

		const handleNewChat = async ({ chatId }: { chatId: string }) => {
			console.log('[UsersSwipe] Получено событие NEW_CHAT с chatId:', chatId)

			try {
				console.log('[UsersSwipe] Запрашиваю данные чата по chatId:', chatId)
				const newChat = await chatService.getChatById(chatId)
				console.log('[UsersSwipe] Данные нового чата получены:', newChat)

				console.log('[UsersSwipe] Обновляю кэш чатов...')
				queryClient.setQueryData<IChat[]>(
					['get-direct-chats'],
					(oldChats = []) => {
						const exists = oldChats.some(c => c.id === chatId)
						console.log('[UsersSwipe] Чат уже существует:', exists)
						return exists ? oldChats : [newChat, ...oldChats]
					}
				)
			} catch (error) {
				console.error('[UsersSwipe] Ошибка обработки NEW_CHAT:', error)
			}
		}

		socket?.on(ChatServerEvent.NEW_CHAT, handleNewChat)

		return () => {
			console.log('[UsersSwipe] Удаляю обработчик NEW_CHAT')
			socket?.off(ChatServerEvent.NEW_CHAT, handleNewChat)
		}
	}, [socket, queryClient, currentAnket])

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
			console.log('[UsersSwipe] Ошибка: userId не определен для текущей анкеты')
			toast.error('Не удалось определить пользователя для действия')
			return
		}
		swipeAction({ userId: currentAnket.userId, action })
	}

	const handleResetSwipe = () => {
		console.log('[UsersSwipe] Запуск сброса истории свайпов')
		setIsResetting(true)
		resetSwipe()
	}

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
				<div className='h-[550px] border border-border rounded-[15px]'>
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
