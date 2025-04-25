'use client'

import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import styles from './recovery.module.css'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'
import { Mail } from 'lucide-react'

interface IRecovery {
	email: string
}

export default function RecoveryForm() {
	const [emailError, setEmailError] = useState('')
	const [isButtonClicked, setIsButtonClicked] = useState(false)
	const [buttonKey, setButtonKey] = useState(0)

	const { mutate: resetPassword } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: ({ email }: IRecovery) => authService.resetPasswordRequest(email),
		onSuccess: () => {
			toast.success('Запрос на сброс пароля отправлен')
			reset()
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || toast.error(error.message)
			console.log(error)
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<IRecovery>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IRecovery> = data => {
		resetPassword(data)
	}

	const handleButtonClick = () => {
		setEmailError('')
		setIsButtonClicked(true)

		if (errors.email) {
			setButtonKey(prevKey => prevKey + 1)
			toast.error('Пожалуйста, заполните поле')
		}
		if (emailError) {
			toast.error('Пользователь с таким email не найден')
		}
	}

	return (
		<LazyMotion features={domAnimation}>
			<m.div initial='hidden' animate='visible'>
				<m.div
					variants={slideUp}
					className={cn(
						styles.login_wrapper,
						'bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] shadow-lg w-[340px] sm:w-[420px] md:w-[450px] lg:w-[500px]'
					)}
				>
					<h1 className={styles.title}>Сброс пароля</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
						<label
							className={cn(
								styles.field,
								'bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-black dark:focus-within:border-white/70'
							)}
						>
							<div className={styles.icon}>
								<Mail />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Почта'
								type='text'
								{...register('email', {
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
							/>
						</label>
						{emailError ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>{emailError}</p>
						) : errors.email ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{errors.email.message}
							</p>
						) : (
							<div className='h-1' />
						)}
						<div className='mb-3 mt-10 text-center'>
							<button
								type='submit'
								onClick={handleButtonClick}
								disabled={!isValid}
								key={buttonKey}
								className={cn(
									{
										[styles.buttonError]: isButtonClicked && errors.email,
										[styles.form_btn]: !(isButtonClicked && errors.email),
									},
									'disabled:opacity-60 disabled:cursor-default disabled:scale-100 dark:bg-white bg-black dark:text-black text-white dark:border-[#3a3a3a] transition-colors duration-300'
								)}
							>
								СБРОСИТЬ
							</button>
						</div>
					</form>
				</m.div>
			</m.div>
		</LazyMotion>
	)
}
