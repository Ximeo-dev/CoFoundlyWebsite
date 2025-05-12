'use client'

import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './register-form.module.css'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
	Check,
	CircleUserRound,
	Eye,
	EyeOff,
	KeyRound,
	Mail,
} from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { Checkbox } from '../shadcn/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAuthForm } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import zxcvbn from 'zxcvbn'
import debounce from 'lodash.debounce'
import InputField from '../input-field/input-field'

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
			router.replace('/profile')
			toast.success('Успешная регистрация')
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
		getValues,
	} = useForm<IAuthForm>({
		mode: 'onChange',
	})

	const handleButtonClick = () => {
		setIsButtonClicked(true)
	}

	const debouncedCheck = useCallback(
		debounce(async (value: string, type: 'email' | 'username') => {
			try {
				const isAvailable = await authService.checkAvailability(type, value)
				if (!isAvailable) {
					if (type === 'email') setEmailError('Почта уже используется')
					else setUsernameError('Имя пользователя уже занято')
				} else {
					if (type === 'email') setEmailError('')
					else setUsernameError('')
				}
			} catch (error) {
				if (type === 'email') setEmailError('Укажите корректную почту')
			}
		}, 300),
		[]
	)

	const handleChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		type: 'email' | 'username'
	) => {
		const value = e.target.value
		setValue(type, value)
		await trigger(type)

		if (
			(!errors.username && type === 'username') ||
			(!errors.email && type === 'email')
		) {
			debouncedCheck(value, type)
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
		if (errors.email || errors.username || errors.password) {
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
						'bg-background border border-border shadow-lg'
					)}
				>
					<h1 className={styles.title}>
						Добро пожаловать в{' '}
						<span className='bg-black dark:bg-white text-white rounded-[30px] px-2 py-1 dark:text-black select-none'>
							{PROJECT_NAME}
						</span>
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
						<InputField
							icon={<CircleUserRound />}
							placeholder='Никнейм'
							type='text'
							{...register('username', {
								required: true,
								maxLength: {
									value: 16,
									message:
										'Имя пользователя должно содержать не более 16 символов',
								},
								minLength: {
									value: 4,
									message:
										'Имя пользователя должно состоять минимум из 4 символов',
								},
								validate: value => {
									if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
										return 'Имя пользователя может состоять только из букв английского алфавита, цифр, и символов "_", "-"'
									}
									return true
								},
							})}
							onChange={e => handleChange(e, 'username')}
							error={errors.username?.message || usernameError}
							className='mb-4'
						/>
						<InputField
							icon={<Mail />}
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
							onChange={e => handleChange(e, 'email')}
							error={errors.email?.message || emailError}
							className='mt-8 mb-4'
						/>
						<InputField
							icon={<KeyRound />}
							placeholder='Пароль'
							type={isShowPassword ? 'text' : 'password'}
							rightIcon={isShowPassword ? <Eye /> : <EyeOff />}
							onRightIconClick={() => setIsShowPassword(!isShowPassword)}
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
							error={errors.password?.message}
							className='mt-8 mb-4'
						/>
						<InputField
							icon={<Check />}
							placeholder='Повторите пароль'
							type={isShowConfirmPassword ? 'text' : 'password'}
							rightIcon={isShowConfirmPassword ? <Eye /> : <EyeOff />}
							onRightIconClick={() =>
								setIsShowConfirmPassword(!isShowConfirmPassword)
							}
							{...register('confirmPassword', {
								required: true,
							})}
							onChange={e => validatePasswords(e, 'confirmPassword')}
							error={errors.confirmPassword?.message}
							className='mt-8 mb-4' // Увеличиваем верхний и нижний отступ
						/>
						<div className='mt-4 flex gap-x-3 max-w-[500px]'>
							<Checkbox
								checked={isChecked}
								onCheckedChange={(checked: any) => setIsChecked(checked)}
								id='agreeement'
							/>
							<label
								htmlFor='agreeement'
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
											(errors.email || errors.username || errors.password),
										[styles.form_btn]: !(
											isButtonClicked &&
											(errors.email || errors.username || errors.password)
										),
									},
									'disabled:opacity-60 disabled:cursor-default disabled:scale-100 dark:bg-white bg-black dark:text-black text-white border-border rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer'
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
