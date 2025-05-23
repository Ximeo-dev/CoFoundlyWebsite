'use client'

import { cn } from '@/lib/utils'
import styles from './security.module.css'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/ui/modal/modal'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/shadcn/button'
import { toast } from 'sonner'
import { Eye, EyeOff, KeyRound, Loader2, Mail } from 'lucide-react'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'
import { ResponseError } from '@/types/error.types'
import { IChangeEmailDto, IChangeEmailForm } from '@/types/change.types'
import { authService } from '@/services/auth.service'
import maskEmail from '@/utils/maskEmail'
import debounce from 'lodash.debounce'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputField from '@/components/ui/input-field/input-field'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { securityService } from '@/services/security.service'

export default function ChangeEmail() {
	const [isOpenEmailModal, setIsOpenEmailModal] = useState(false)
	const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false)
	const [emailAvailableError, setEmailAvailableError] = useState('')
	const [isFormValid, setIsFormValid] = useState(false)

	const { user } = useAuth()

	const { mutate: changeEmail, isPending } = useMutation({
		mutationKey: ['change-email-request'],
		mutationFn: (data: IChangeEmailDto) =>
			securityService.changeEmailRequest(data),
		onSuccess: data => {
			toast.success(data.message)
			setIsOpenEmailModal(false)
			reset()
		},
		onError: (error: ResponseError) => {
			if (error.status === 403) {
				toast.info('Сначала подтвердите почту')
			} else if (error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else toast.error('Ошибка смены почты')
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		setValue,
		trigger,
		setError,
		getValues,
	} = useForm<IChangeEmailForm>({
		mode: 'onChange',
	})

	const debouncedCheck = useCallback(
		debounce(async (value: string) => {
			try {
				const isAvailable = await authService.checkAvailability('email', value)
				if (!isAvailable) {
					setEmailAvailableError('Почта уже используется')
				} else {
					setEmailAvailableError('')
				}
			} catch (error) {
				setEmailAvailableError('Укажите корректную почту')
			}
		}, 300),
		[]
	)

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValue('newEmail', value)
		await trigger('newEmail')

		if (value === user?.email) {
			setError('newEmail', {
				type: 'manual',
				message: 'Укажите новый почтовый адрес',
			})
		} else if (!errors.newEmail) {
			debouncedCheck(value)
		}
	}

	const validateForm = () => {
		const newEmail = getValues('newEmail')

		const hasErrors =
			!isValid || emailAvailableError || newEmail === user?.email

		setIsFormValid(!hasErrors)
	}

	useEffect(() => {
		validateForm()
	}, [isValid, emailAvailableError, errors.newEmail])

	const onSubmit: SubmitHandler<IChangeEmailForm> = data => {
		changeEmail(data)
	}

	return (
		<div className={cn(styles.change_block, 'border-border')}>
			<div>
				<FadeInUp className={styles.email}>Электронная почта</FadeInUp>
				<FadeInUp
					className={cn(
						styles.user_email,
						'text-[#696363] dark:text-[#929191]'
					)}
				>
					{(user?.email && maskEmail(user.email)) || ''}
				</FadeInUp>
			</div>
			<button
				onClick={() => setIsOpenEmailModal(true)}
				className={cn(
					styles.change_btn,
					'bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700'
				)}
			>
				Изменить
			</button>
			{isOpenEmailModal && (
				<Modal
					onClose={() => setIsOpenEmailModal(false)}
					isOpen={isOpenEmailModal}
					className={styles.modal}
				>
					<div className={styles.modal_inner}>
						<h2 className={styles.modal_title}>Смена почты</h2>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<InputField
									icon={<KeyRound />}
									placeholder='Пароль'
									type={isShowCurrentPassword ? 'text' : 'password'}
									rightIcon={isShowCurrentPassword ? <Eye /> : <EyeOff />}
									onRightIconClick={() =>
										setIsShowCurrentPassword(!isShowCurrentPassword)
									}
									{...register('currentPassword', {
										required: true,
										minLength: 8,
										maxLength: 128,
									})}
								/>
								<Link
									className={cn(
										styles.forgot_password,
										'dark:text-[#929191] text-[#696363] hover:dark:text-white hover:text-black'
									)}
									href={'/reset-password'}
								>
									Забыл пароль?
								</Link>
								<InputField
									icon={<Mail />}
									placeholder='Почта'
									type='text'
									{...register('newEmail', {
										required: true,
										validate: {
											hasAtSymbol: value =>
												/@/.test(value) ||
												'Адрес электронной почты должен содержать символ "@"',
											isValidEmailFormat: value =>
												/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(
													value
												) ||
												'Адрес электронной почты должен быть в корректном формате',
										},
									})}
									onChange={e => handleChange(e)}
									error={errors.newEmail?.message || emailAvailableError}
								/>
								<div className='mt-5 w-full flex items-center justify-center'>
									<Button
										type='submit'
										disabled={isPending || !isFormValid}
										className='text-center'
									>
										{isPending ? (
											<Loader2 className='animate-spin' />
										) : (
											'Подтвердить'
										)}
									</Button>
								</div>
							</div>
						</form>
					</div>
				</Modal>
			)}
		</div>
	)
}
