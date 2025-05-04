'use client'

import { cn } from '@/lib/utils'
import styles from './security.module.css'
import { useState } from 'react'
import Modal from '@/components/ui/modal/modal'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/shadcn/button'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'
import { twoFactorService } from '@/services/two-factor.service'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'

export default function TwoFactor() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [generatedToken, setGeneratedToken] = useState('')

  const { user } = useAuth()
  
  const { mutate: bind, isPending } = useMutation({
		mutationKey: ['twoFactor-bind'],
		mutationFn: () => twoFactorService.twoFactorBind(),
		onSuccess: data => {
			setGeneratedToken(data.data)
			setIsModalOpen(true)
		},
	})

	const { mutate: unbind } = useMutation({
		mutationKey: ['twoFactor-unbind'],
		mutationFn: () => twoFactorService.twoFactorUnbind(),
		onError: (error: any) => {
			if (error && error.status === 403) {
				toast.success('Подтверждение отправлено в телеграм')
			}
		}
	})

  const handleCopy = () => {
    if (!generatedToken) return
    navigator.clipboard.writeText(`/2fa ${generatedToken}`)
    setIsCopied(true)
    toast.success('Команда скопирована')
  }

  return (
		<>
			<div className={cn(styles.change_block, 'border-border')}>
				<div>
					{user?.securitySettings ? (
						<>
							<FadeInUp className={styles.email}>
								{user.securitySettings.twoFactorEnabled &&
								user.securitySettings.telegramId
									? '2FA включен'
									: 'Включить 2FA'}
							</FadeInUp>
							{user?.securitySettings.twoFactorEnabled &&
								user?.securitySettings.telegramId && (
									<FadeInUp
										className={cn(
											styles.user_email,
											'text-[#696363] dark:text-[#929191] text-nowrap'
										)}
									>
										Ваш telegram id: {user?.securitySettings?.telegramId}
									</FadeInUp>
								)}
						</>
					) : null}
				</div>
				{user?.securitySettings?.twoFactorEnabled &&
				user?.securitySettings?.telegramId ? (
					<button
						onClick={() => unbind()}
						className={cn(
							styles.change_btn,
							'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
						)}
						disabled={isPending}
					>
						Отключить
					</button>
				) : (
					<button
						onClick={() => bind()}
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
					<div className={styles.modal_inner}>
						<h2 className={styles.modal_title}>
							Активация двухфакторной аутентификации
						</h2>

						<div className={styles.ft_var}>
							<p className={styles.ft_var_title}>
								Вариант 1: скопируйте команду и отправьте её боту{' '}
								<a
									className='transition-all duration-300 border-b border-dashed border-b-foreground dark:text-sky-100 dark:hover:text-white'
									href='https://t.me/CoFoundlyBot'
									target='_blank'
								>
									@CoFoundlyBot
								</a>
							</p>

							<div
								onClick={handleCopy}
								className={cn(
									styles.copy_block,
									'bg-[#d9d7d7] dark:bg-[#111111]'
								)}
							>
								<span className='font-mono select-all text-center'>
									/2fa {generatedToken}
								</span>
								<Button variant='ghost' size='icon'>
									{isCopied ? <Check size={18} /> : <Copy size={18} />}
								</Button>
							</div>
						</div>

						<div className={styles.sc_var}>
							<p className={styles.sc_var_title}>
								Вариант 2: нажмите на кнопку ниже — бот автоматически получит
								команду
							</p>
							<a
								href={`https://t.me/CoFoundlyBot?start=2fa_${generatedToken}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button className='w-full rounded-lg'>
									Открыть Telegram и активировать
								</Button>
							</a>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}