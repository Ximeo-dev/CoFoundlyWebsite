'use client'

import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './register-form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { CircleUser, Eye, EyeOff, KeyRound } from 'lucide-react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { slideUp } from '@/lib/motion-variants'
import { Checkbox } from '../shadcn/checkbox'

export default function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<any> = data => {
		reset()
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
						<span className='bg-black dark:bg-white text-white rounded-[30px] px-3 py-1.5 dark:text-black select-none'>
							{PROJECT_NAME}
						</span>
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
						<label
							className={cn(
								styles.field,
								'bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-slate-800'
							)}
						>
							<div className={styles.icon}>
								<CircleUser />
							</div>
							<input
								className='bg-transparent outline-none'
								placeholder='Почта'
								type='text'
								{...register('identifier', {
									required: true,
									minLength: 4,
								})}
							/>
						</label>
						<label
							className={cn(
								styles.field,
								'mb-2 mt-6 bg-white dark:bg-[#151515] border border-[#D9D7D7] dark:border-[#3a3a3a] focus-within:border focus-within:border-slate-800'
							)}
						>
							<div className={styles.icon}>
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
						<div className='mt-5 flex gap-x-3 max-w-[500px]'>
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
								// disabled={!isValid}
								className={cn(
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