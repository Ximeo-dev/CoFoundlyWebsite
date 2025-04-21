'use client'

import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './register-form.module.css'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Check, CircleUser, Eye, EyeOff, KeyRound, Mail, SquareUserRound } from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { Checkbox } from '../shadcn/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAuthForm } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import zxcvbn from 'zxcvbn'
import debounce from 'lodash.debounce'

export default function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
	const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
	const [isButtonClicked, setIsButtonClicked] = useState(false)
	const [buttonKey, setButtonKey] = useState(0)
	const [isChecked, setIsChecked] = useState(false)
	const [usernameError, setUsernameError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [isFormValid, setIsFormValid] = useState(false)

	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: registerMode } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthForm) => authService.register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userProfile'],
			})
			router.replace('/profile'), toast.success('Успешная регистрация')
			reset()
		},
		onError: error => {
			toast.error(error.message)
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		trigger,
		setValue,
		setError,
		clearErrors,
		getValues
	} = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const handleButtonClick = () => {
		setIsButtonClicked(true)
	}

	const debouncedCheck = useCallback(
		debounce(async (value: string) => {
			try {
				const isAvailable = await authService.checkEmailAvailability(value)
				if (!isAvailable) {
					setEmailError('Почта уже используется')
				} else {
					setEmailError('')
				}
			} catch (error) {
				setEmailError('Укажите корректную почту')
			}
		}, 300),
		[]
	)

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value
		setValue('email', value)
		await trigger('email')

		if (
			(!errors.name) || 
			(!errors.email)
		) {
			debouncedCheck(value)
		}
	}

	const validatePasswords = async (
		e: React.ChangeEvent<HTMLInputElement>,
		type: 'password' | 'confirmPassword'
	) => {
		const value = e.target.value
		setValue(type, value)

		const password = getValues('password')
		const confirmPassword = getValues('confirmPassword')

		await trigger(type)
		if (!errors.password && confirmPassword && password !== confirmPassword) {
			setError('password', {
				type: 'manual',
				message: 'Пароли не совпадают',
			})
		} else if (confirmPassword && password === confirmPassword) {
			clearErrors('password')
			await trigger('password')
		} else {
			await trigger(type)
		}
	}
	
	const validateForm = () => {
		const password = getValues('password')
		const confirmPassword = getValues('confirmPassword')

		const hasErrors =
			!isValid ||
			usernameError ||
			emailError ||
			password !== confirmPassword ||
			!isChecked

		setIsFormValid(!hasErrors)
	}

	useEffect(() => {
		validateForm()
	}, [isValid, usernameError, emailError, isChecked, errors.password])

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		if (errors.email || errors.name || errors.password) {
			setButtonKey(prevKey => prevKey + 1)
			return toast.error('Пожалуйста, заполните все поля')
		}
		if (usernameError) {
			return toast.error('Имя пользователя уже занято')
		}
		if (emailError) {
			return toast.error('Пользователь с таким email уже зарегистрирован')
		}
		registerMode(data)
	}

	return (
		<LazyMotion features={domAnimation}>
			<m.div initial='hidden' animate='visible'>
				<m.div
					variants={slideUp}
					className={cn(
						styles.register_wrapper,
						'bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] shadow-lg'
					)}
				>
					<h1 className={styles.title}>
						Добро пожаловать в{' '}
						<span className='bg-black dark:bg-white text-white rounded-[30px] px-2 py-1 dark:text-black select-none'>
							{PROJECT_NAME}
						</span>
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
						<label
							className={cn(
								styles.field,
								'mb-2 bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-black dark:focus-within:border-white/70'
							)}
						>
							<div
								className={cn(
									styles.icon,
									'focus-within:text-black dark:focus-within:text-white/70'
								)}
							>
								<SquareUserRound />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Имя'
								type='text'
								{...register('name', {
									required: true,
									maxLength: {
										value: 16,
										message:
											'Имя пользователя должно содержать не более 16 символов',
									},
									// validate: value => {
									// 	if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
									// 		return 'Имя пользователя может состоять только из букв английского алфавита, цифр, и символов "_", "-"'
									// 	}
									// 	return true
									// },
								})}
							/>
						</label>
						{errors.name ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{errors.name.message}
							</p>
						) : usernameError ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{usernameError}
							</p>
						) : (
							<div className='h-1' />
						)}
						<label
							className={cn(
								styles.field,
								'mt-4 mb-1 bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-black dark:focus-within:border-white/70'
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
								onChange={e => handleChange(e)}
							/>
						</label>
						{errors.email ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{errors.email.message}
							</p>
						) : emailError ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>{emailError}</p>
						) : (
							<div className='h-1' />
						)}
						<label
							className={cn(
								styles.field,
								'mb-1 mt-5 bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-black dark:focus-within:border-white/70'
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
									validate: {
										minLength: value =>
											value.length >= 8 ||
											'Пароль должен содержать минимум 8 символов',
										maxLength: value =>
											value.length <= 128 ||
											'Пароль должен содержать не более 128 символов',
										hasLowerCase: value =>
											/[a-z]/.test(value) ||
											'Пароль должен содержать хотя бы одну строчную букву',
										hasNumber: value =>
											/[0-9]/.test(value) ||
											'Пароль должен содержать хотя бы одну цифру',
										passwordStrength: value => {
											const result = zxcvbn(value)
											if (result.score <= 1) {
												return 'Пароль слишком простой'
											}
											return true
										},
									},
								})}
								onChange={e => validatePasswords(e, 'password')}
							/>
							<div
								className={styles.icon}
								onClick={() => setIsShowPassword(!isShowPassword)}
							>
								{isShowPassword ? <Eye /> : <EyeOff />}
							</div>
						</label>
						{errors.password ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{errors.password.message}
							</p>
						) : (
							<div className='h-1' />
						)}
						<label
							className={cn(
								styles.field,
								'mt-5 mb-2 bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-black dark:focus-within:border-white/70'
							)}
						>
							<div
								className={cn(
									styles.icon,
									'focus-within:text-black dark:focus-within:text-white/70'
								)}
							>
								<Check />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Повторите пароль'
								type={isShowConfirmPassword ? 'text' : 'password'}
								{...register('confirmPassword', {
									required: true,
								})}
								onChange={e => validatePasswords(e, 'confirmPassword')}
							/>
							<div
								className={styles.icon}
								onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
							>
								{isShowConfirmPassword ? <Eye /> : <EyeOff />}
							</div>
						</label>
						{errors.confirmPassword ? (
							<p className='text-red-500 text-sm lg:h-1 h-auto'>
								{errors.confirmPassword.message}
							</p>
						) : (
							<div className='h-1' />
						)}
						<div className='mt-4 flex gap-x-3 max-w-[500px]'>
							<Checkbox
								checked={isChecked}
								onCheckedChange={(checked: any) => setIsChecked(checked)}
								id='agreeement'
							/>
							<label
								htmlFor=''
								className='text-sm font-medium leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Я согласен(-на) с положениями{' '}
								<span className='text-neutral-600 dark:text-slate-300 cursor-pointer hover:underline hover:underline-offset-2'>
									Пользовательского соглашения
								</span>
								,{' '}
								<span className='text-neutral-600 dark:text-slate-300 cursor-pointer hover:underline hover:underline-offset-2'>
									Политикой конфиденциальности
								</span>{' '}
								и{' '}
								<span className='text-neutral-600 dark:text-slate-300 cursor-pointer hover:underline hover:underline-offset-2'>
									правилами проекта
								</span>
							</label>
						</div>
						<div className='mb-3 mt-8 text-center'>
							<button
								type='submit'
								key={buttonKey}
								onClick={handleButtonClick}
								disabled={!isFormValid}
								className={cn(
									{
										[styles.buttonError]:
											isButtonClicked &&
											(errors.email || errors.name || errors.password),
										[styles.form_btn]: !(
											isButtonClicked &&
											(errors.email || errors.name || errors.password)
										),
									},
									'disabled:opacity-60 disabled:cursor-default disabled:scale-100 dark:bg-white bg-black dark:text-black text-white dark:border-[#3a3a3a] rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer'
								)}
							>
								СОЗДАТЬ АККАУНТ
							</button>
						</div>
						<div className='flex items-center gap-x-1.5 justify-center mt-4'>
							<h2 className=''>Уже есть аккаунт?</h2>
							<Link
								className={cn(
									styles.to_login,
									'dark:text-slate-300 hover:dark:text-white text-neutral-500 hover:text-black'
								)}
								href={'/login'}
							>
								Войти
							</Link>
						</div>
					</form>
				</m.div>
			</m.div>
		</LazyMotion>
	)
}