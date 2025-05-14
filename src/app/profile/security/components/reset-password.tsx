'use client'

import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import styles from './security.module.css'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'

export default function ResetPassword() {
  const { user } = useAuth()

  const { mutate: resetPassword } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: (email: any) => authService.resetPasswordRequest(email),
		onSuccess: () => {
			toast.success('Запрос на изменение пароля отправлен')
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || toast.error(error.message)
			console.log(error)
		},
	})

  const handleClick = () => {
    resetPassword(user?.email)
  }

  return (
		<div className={styles.reset_block}>
			<FadeInUp className={styles.reset_text}>
				Пароль
			</FadeInUp>
			<button
				onClick={handleClick}
				className={cn(
					styles.pass_change,
					'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
				)}
			>
				Изменить
			</button>
		</div>
	)
}