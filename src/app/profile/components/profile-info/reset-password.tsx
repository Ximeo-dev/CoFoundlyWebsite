'use client'

import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { useProfileData } from '@/hooks/useProfileData'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import styles from '../security/security.module.css'
import { cn } from '@/lib/utils'

export default function ResetPassword() {
  const { userProfile } = useProfileData()

  const { mutate: resetPassword } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: (email: any) => authService.resetPasswordRequest(email),
		onSuccess: () => {
			toast.success('Запрос на сброс пароля отправлен')
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || toast.error(error.message)
			console.log(error)
		},
	})

  const handleClick = () => {
    resetPassword(userProfile?.email)
  }

  return (
		<div className={styles.reset_block}>
			<TextAnimate
				animation='slideUp'
				className={styles.reset_text}
				by='character'
				duration={0.2}
			>
				Пароль
			</TextAnimate>
			<button
				onClick={handleClick}
				className={cn(styles.pass_change, 'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700')}
			>
				Поменять
			</button>
		</div>
	)
}