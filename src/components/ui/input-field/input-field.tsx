'use client'

import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from '../register-form/register-form.module.css'

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode
	rightIcon?: ReactNode
	onRightIconClick?: () => void
	error?: string
	className?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void 
	placeholder?: string
	type?: string
}

export default function InputField({
	icon,
	rightIcon,
	onRightIconClick,
	error,
	className,
	onChange,
	placeholder,
	type = 'text',
	...props
}: IInputField) {
	return (
		<>
			<label
				className={cn(
					styles.field,
					'flex items-center relative px-2 rounded-[15px] transition-colors duration-200 ease-linear mb-1 mt-5 bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70',
					className
				)}
			>
				{icon && (
					<div
						className={cn(
							styles.icon,
							'focus-within:text-black dark:focus-within:text-white/70 mr-3 text-[#585654] transition-colors duration-200 ease-linear'
						)}
					>
						{icon}
					</div>
				)}
				<input
					className='bg-transparent outline-none pr-2 py-2 outline-none bg-transparent placeholder:text-[#585654] w-full flex z-10'
					placeholder={placeholder}
					type={type}
					onChange={onChange}
					{...props}
				/>
				{rightIcon && (
					<div
						className='mr-3 text-[#585654] transition-colors duration-200 ease-linear'
						onClick={onRightIconClick}
					>
						{rightIcon}
					</div>
				)}
			</label>
			{error ? (
				<p className='text-red-500 text-sm lg:h-1 h-auto'>{error}</p>
			) : (
				<div className='h-1' />
			)}
		</>
	)
}
