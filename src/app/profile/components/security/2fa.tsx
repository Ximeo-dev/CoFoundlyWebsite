'use client'

import { cn } from '@/lib/utils'
import styles from './security.module.css'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { useState } from 'react'
import Modal from '@/components/ui/modal/modal'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/shadcn/button'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'

export default function TwoFactor() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [generatedToken, setGeneratedToken] = useState('')

  const { user } = useAuth()
  
  const { mutate, isPending } = useMutation({
		mutationKey: ['twoFactor-bind'],
		mutationFn: () => authService.twoFactorBind(),
		onSuccess: data => {
			setGeneratedToken(data.data)
			setIsModalOpen(true)
		},
	})

  const handleCopy = () => {
    if (!generatedToken) return
    navigator.clipboard.writeText(`/2fa ${generatedToken}`)
    setIsCopied(true)
    toast.success('Команда скопирована')
  }

  return (
		<>
			<div
				className={cn(
					styles.change_block,
					'border-[#d9d7d7] dark:border-[#3a3a3a]'
				)}
			>
				<div>
					{user?.securitySettings ? (
						<TextAnimate
							className={styles.email}
							animation='slideUp'
							by='character'
							duration={0.2}
						>
							{user.securitySettings.twoFactorEnabled &&
							user.securitySettings.telegramId
								? '2FA включен'
								: 'Включить 2FA'}
						</TextAnimate>
					) : null}
				</div>
				{user?.securitySettings.twoFactorEnabled &&
				user.securitySettings.telegramId ? (
					<div>{user.securitySettings.telegramId}</div>
				) : (
					<button
						onClick={() => mutate()}
						className={cn(
							styles.change_btn,
							'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
						)}
						disabled={isPending}
					>
						Включить
					</button>
				)}
			</div>

			{isModalOpen && generatedToken && (
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					className={styles.modal}
				>
					<p className={styles.modal_text}>
						Скопируйте команду и отправьте её боту телеграм-бота{' '}
						<a
							className='transition-all duration-500 border-b dark:text-sky-100 border-b-foreground dark:border-b-white border-dashed hover:text-neutral-700 dark:hover:text-white'
							href='https://t.me/CoFoundlyBot'
						>
							CoFoundly
						</a>
					</p>
					<div
						onClick={handleCopy}
						className={cn(styles.copy_block, 'bg-[#d9d7d7] dark:bg-[#111111]')}
					>
						<span className='font-mono select-all'>/2fa {generatedToken}</span>
						<Button variant='ghost' size='icon'>
							{isCopied ? <Check size={4} /> : <Copy size={4} />}
						</Button>
					</div>
				</Modal>
			)}
		</>
	)
}