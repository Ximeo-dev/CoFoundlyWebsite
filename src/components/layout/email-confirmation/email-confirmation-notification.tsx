'use client'

import { MailCheck } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '@/services/user.service'
import { ResponseError } from '@/types/error.types'
import { useAuth } from '@/hooks/useAuth'

export function EmailConfirmationNotification() {
	const { isEmailConfirmed, isAuthenticated } = useAuth()
	const queryClient = useQueryClient()

	if (!isAuthenticated || isEmailConfirmed) {
		return null
	}

	const handleResendConfirmation = async () => {
		try {
			await userService.emailConfirmation()
			toast.success('Письмо с подтверждением отправлено')
		} catch (error: ResponseError | any) {
			if (error.status && error.status === 400) {
				toast.success('Почта уже подтверждена')
				queryClient.invalidateQueries({ queryKey: ['userProfile'] })
			}
		}
	}

	return (
		<div className='fixed bottom-5 right-5 z-50 flex w-80 items-start gap-4 rounded-xl border p-4 animate-fade-in dark:border-[#3a3a3a] bg-background dark:text-slate-300 border-slate-300 text-slate-800'>
			<div className='p-2 bg-black dark:bg-white rounded-full'>
				<MailCheck size={28} className='text-white dark:text-black' />
			</div>
			<div className='flex-1'>
				<h2 className='text-base font-semibold mb-1'>Подтвердите почту</h2>
				<p className='text-sm text-black dark:text-white mb-5'>
					Чтобы получить полный доступ ко всем функциям, подтвердите ваш email.
				</p>
				<button
					onClick={handleResendConfirmation}
					className='cursor-pointer hover:bg-neutral-800 dark:hover:bg-white/70 transition-colors duration-300 px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black shadow-[-30px_0px_90px_-13px_#805ad5,30px_0px_90px_-13px_#81e6d9] text-sm font-medium'
				>
					Отправить письмо
				</button>
			</div>
		</div>
	)
}
