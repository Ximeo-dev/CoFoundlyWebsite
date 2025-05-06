'use client'

import { useFormContext } from 'react-hook-form'
import Avatar from '../../profile-info/avatar'

export default function PersonalData() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-center'>

				<Avatar size={512} editable className='w-fit' />
			</div>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Личные данные
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Укажите ваше имя и дату рождения
				</p>
			</div>

			<div>
				<input
					{...register('name')}
					className={`w-full px-4 py-3 rounded-lg border placeholder:text-[#585654] ${
						errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent selection:bg-primary dark:bg-input/30`}
					placeholder='Имя'
				/>
				{errors.name && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.name.message as string}
					</p>
				)}
			</div>

			<div>
				<input
					{...register('birthDate', {
						required: 'Дата рождения обязательна',
						pattern: {
							value: /^\d{4}-\d{2}-\d{2}$/,
							message: 'Дата должна быть в формате ГГГГ-ММ-ДД',
						},
					})}
					type='date'
					className={`w-full px-4 py-3 rounded-lg border placeholder:text-[#585654] ${
						errors.birthDate
							? 'border-red-500 focus:ring-red-500'
							: 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent selection:bg-primary dark:bg-input/30`}
				/>
				{errors.birthDate && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.birthDate.message as string}
					</p>
				)}
			</div>
		</div>
	)
}
