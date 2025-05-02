'use client'

import { useEffect, useState } from 'react'
import styles from './confirm.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'
import { Check, Eye, EyeOff, KeyRound } from 'lucide-react'
import zxcvbn from 'zxcvbn'

interface IResetPasswordConfirmForm {
	password: string
	confirmPassword: string
}

interface IResetPasswordData {
	password: string
	token: string
}

export default function ConfirmForm() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { mutate: confirm } = useMutation({
		mutationKey: ['confirm-reset-password'],
		mutationFn: ({ password, token }: IResetPasswordData) =>
			authService.resetPasswordConfirm(password, token),
		onSuccess: () => {
			toast.success('Пароль восстановлен')
			reset()
			router.push('/login')
		},
		onError: (error: any) => {
			if (isAxiosError(error) && error.status === 400) {
				toast.error('Время действия ссылки сброса пароля истекло')
			} else {
				toast.error(error.message)
			}
		},
	})

  const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		getValues,
		setValue,
		trigger,
		setError,
		clearErrors,
	} = useForm<IResetPasswordConfirmForm>({
		mode: 'onChange',
	})

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

    const hasErrors = !isValid || password !== confirmPassword

    setIsFormValid(!hasErrors)
  }

  useEffect(() => {
    validateForm()
  }, [isValid, errors.password])

  const onSubmit: SubmitHandler<IResetPasswordConfirmForm> = data => {
    if (!token) {
      router.push('/reset-password')
      return toast.error('Срок действия ссылки восстановления пароля истёк')
    }
    confirm({ password: data.password, token })
  }

	return (
		<LazyMotion features={domAnimation}>
			<m.div initial='hidden' animate='visible'>
				<m.div
					variants={slideUp}
					className={cn(
						styles.login_wrapper,
						'bg-background border border-border shadow-lg w-[500px]'
					)}
				>
					<h1 className={styles.title}>Восстановление пароля</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
						<label
							className={cn(
								styles.field,
								'mb-1 mt-6 bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70'
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
								placeholder='Новый Пароль'
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
								'mt-6 mb-2 bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70'
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
								placeholder='Введи новый пароль повторно'
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
						<div className='mb-3 mt-8 text-center'>
							<button
								type='submit'
								disabled={!isFormValid}
								className={cn(
									{
										[styles.buttonError]:
											isButtonClicked &&
											(errors.password || errors.confirmPassword),
										[styles.form_btn]: !(
											isButtonClicked &&
											(errors.password || errors.confirmPassword)
										),
									},
									'disabled:opacity-60 disabled:cursor-default disabled:scale-100 dark:bg-white bg-black dark:text-black text-white dark:border-[#3a3a3a] transition-colors duration-300'
								)}
							>
								ПОДТВЕРДИТЬ
							</button>
						</div>
					</form>
				</m.div>
			</m.div>
		</LazyMotion>
	)
}