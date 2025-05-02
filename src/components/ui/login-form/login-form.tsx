'use client'

import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './login-form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { CircleUser, Eye, EyeOff, KeyRound, Mail } from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ILoginForm } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { ResponseError } from '@/types/error.types'

export default function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
	const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
	const [buttonKey, setButtonKey] = useState(0)

	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: login } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginForm) => authService.login(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userProfile'],
			})
			router.push('/profile')
			toast.success('Успешный вход')
		},
		onError: (error: ResponseError) => {
			toast.dismiss()
			if (error.status && error.status === 401) {
				toast.error('Указан неверный логин или пароль')
			} else {
				toast.error(error.message)
			}
		},
	})

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<ILoginForm>({
    mode: 'onChange'
  })

	const handleButtonClick = () => {
		setIsButtonClicked(true)
		if (errors.email || errors.password) {
			setButtonKey(prevKey => prevKey + 1)
			toast.error('Пожалуйста, заполните все поля')
		}
	}

  const onSubmit: SubmitHandler<ILoginForm> = data => {
		login(data)
		reset()
  }

  return (
		<LazyMotion features={domAnimation}>
			<m.div initial='hidden' animate='visible'>
				<m.div
					variants={slideUp}
					className={cn(
						styles.login_wrapper,
						'bg-background border border-border shadow-lg'
					)}
				>
					<h1 className={styles.title}>
						С возвращением в{' '}
						<span className='bg-black dark:bg-white text-white rounded-[30px] px-2 py-1 dark:text-black select-none'>
							{PROJECT_NAME}
						</span>
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
						<label
							className={cn(
								styles.field,
								'bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70'
							)}
						>
							<div
								className={cn(
									styles.icon,
									'focus-within:text-black dark:focus-within:text-white/70'
								)}
							>
								<Mail />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Почта'
								type='email'
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
						<label
							className={cn(
								styles.field,
								'mb-2 mt-6 bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70'
							)}
						>
							<div
								className={cn(
									styles.icon,
									'focus-within:text-black dark:focus-within:text-white/70'
								)}
							>
								<KeyRound />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Пароль'
								type={isShowPassword ? 'text' : 'password'}
								{...register('password', {
									required: true,
									minLength: 8,
									maxLength: 128,
								})}
							/>
							<div
								className={styles.icon}
								onClick={() => setIsShowPassword(!isShowPassword)}
							>
								{isShowPassword ? <Eye /> : <EyeOff />}
							</div>
						</label>
						<Link
							className={cn(
								styles.forgot_password,
								'dark:text-[#929191] text-[#696363] hover:dark:text-white hover:text-black'
							)}
							href={'/reset-password'}
						>
							Забыл пароль?
						</Link>
						<div className='mb-3 mt-8 text-center'>
							<button
								type='submit'
								onClick={handleButtonClick}
								disabled={!isValid}
								key={buttonKey}
								className={cn(
									{
										[styles.buttonError]:
											isButtonClicked && (errors.email || errors.password),
										[styles.form_btn]: !(
											isButtonClicked &&
											(errors.email || errors.password)
										),
									},
									'disabled:opacity-60 disabled:cursor-default disabled:scale-100 dark:bg-white bg-black dark:text-black text-white border-border transition-colors duration-300'
								)}
							>
								ВОЙТИ
							</button>
						</div>
						<div className='flex items-center gap-x-1.5 justify-center mt-4'>
							<h2 className=''>Нет аккаунта?</h2>
							<Link
								className={cn(
									styles.to_register,
									'dark:text-slate-300 hover:dark:text-white text-neutral-500 hover:text-black'
								)}
								href={'/register'}
							>
								Регистрация
							</Link>
						</div>
					</form>
				</m.div>
			</m.div>
		</LazyMotion>
	)
}