'use client'

import AnketView from '@/app/(auth)/components/user-anket/anket-view/anket-view'
import { swipeService } from '@/services/swipe.service'
import { chatService } from '@/services/chat.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/shadcn/button'
import SkeletonView from '@/app/(auth)/components/user-anket/anket-view/skeleton-view'
import { useSocket } from '@/hooks/useSocket'
import { ChatServerEvent, IChat } from '@/types/chat.types'
import { useProfile } from '@/hooks/anket/useProfile'
import Link from 'next/link'
import { ENDPOINTS } from '@/config/endpoints.config'

export default function UsersSwipe() {
	const [intent, setIntent] = useState<'similar' | 'complement' | 'liked'>(
		'similar'
	)
	const [currentAnket, setCurrentAnket] = useState<any>(null)
	const [remainingAnkets, setRemainingAnkets] = useState<any[]>([])
	const socket = useSocket()
	const queryClient = useQueryClient()
	const { anket, isLoading: isLoadingProfile } = useProfile()

	const { data, refetch, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: ['swipe users', intent],
		queryFn: async () => {
			const result = await swipeService.swipeUsers(intent)
			return result
		},
		enabled: !!anket && !isLoadingProfile,
		retry: false,
	})

	useEffect(() => {
		if (isSuccess && data && anket) {
			if (Array.isArray(data)) {
				if (data.length > 0) {
					setCurrentAnket(data[0])
					setRemainingAnkets(data.slice(1))
				} else {
					setCurrentAnket(null)
					setRemainingAnkets([])
				}
			} else if (data?.userId) {
				setCurrentAnket(data)
				setRemainingAnkets([])
			} else {
				setCurrentAnket(null)
				setRemainingAnkets([])
			}
		}
	}, [isSuccess, data, anket])

	const { mutate: swipeAction } = useMutation({
		mutationFn: ({
			userId,
			action,
		}: {
			userId: string
			action: 'like' | 'skip'
		}) => swipeService.swipeAction(userId, action),
		onSuccess: async response => {
			if (response?.isMatch) {
				toast.success(
					`У Вас match с ${currentAnket?.name}! Можете начать общение прямо сейчас`,
					{
						duration: 7000,
					}
				)
			}
			if (remainingAnkets.length > 0 && anket) {
				setCurrentAnket(remainingAnkets[0])
				setRemainingAnkets(remainingAnkets.slice(1))
			} else {
				const result = await refetch()
				if (Array.isArray(result.data)) {
					if (result.data.length > 0) {
						setCurrentAnket(result.data[0])
						setRemainingAnkets(result.data.slice(1))
					} else {
						setCurrentAnket(null)
						setRemainingAnkets([])
					}
				} else if (result.data?.userId) {
					setCurrentAnket(result)
					setRemainingAnkets([])
				} else {
					setCurrentAnket(null)
					setRemainingAnkets([])
				}
			}
		},
		onError: (error: any) => {
			toast.error(error.message || 'Не удалось выполнить действие')
		},
	})

	useEffect(() => {
		const handleNewChat = async ({ chatId }: { chatId: string }) => {
			try {
				const newChat = await chatService.getChatById(chatId)
				queryClient.setQueryData<IChat[]>(
					['get-direct-chats'],
					(oldChats = []) => {
						const exists = oldChats.some(c => c.id === chatId)
						return exists ? oldChats : [newChat, ...oldChats]
					}
				)
			} catch (error) {}
		}

		socket?.on(ChatServerEvent.NEW_CHAT, handleNewChat)

		return () => {
			socket?.off(ChatServerEvent.NEW_CHAT, handleNewChat)
		}
	}, [socket, queryClient, currentAnket])

	const handleIntentChange = (value: 'similar' | 'complement' | 'liked') => {
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

	return (
		<div className=''>
			{isLoadingProfile ? (
				<div className='text-center'>Загрузка...</div>
			) : !anket ? (
				<div className='h-[550px] border border-border rounded-[15px]'>
					<div className='flex items-center justify-center h-full flex-col gap-y-4'>
						<div className='text-center text-lg font-semibold text-gray-800 dark:text-white'>
							Сперва создайте свою анкету
						</div>
						<Link href={ENDPOINTS.HOME}>
							<Button>Создать</Button>
						</Link>
					</div>
				</div>
			) : isLoading ? (
				<SkeletonView />
			) : isError ? (
				<div className='text-center text-red-500'>
					Ошибка: {error?.message || 'Не удалось загрузить анкеты'}
				</div>
			) : currentAnket?.userId || intent === 'liked' ? (
				<div>
					<AnketView
						key={currentAnket?.userId}
						id={currentAnket?.userId}
						showProgress={false}
						anket={currentAnket}
						editable={false}
						intent={intent}
						handleIntentChange={handleIntentChange}
						handleSwipeAction={handleSwipeAction}
						isEmpty={currentAnket == null}
					/>
				</div>
			) : (
				<div className='h-[550px] border border-border rounded-[15px]'>
					<div className='flex items-center justify-center h-full flex-col gap-y-4'>
						<div className='text-center'>
							Анкеты закончились
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
