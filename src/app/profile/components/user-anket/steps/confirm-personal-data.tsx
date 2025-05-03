'use client'

import { useAuth } from '@/hooks/useAuth'
import { useFormContext } from 'react-hook-form'

export default function ConfirmPersonalData() {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const { user } = useAuth()

	return (
		<div>
			<label className='block mb-2 font-semibold'>Имя</label>
			<input
				{...register('name', { required: 'Имя обязательно' })}
				defaultValue={user?.name || ''}
				className='input'
				placeholder='Введите имя'
			/>
			{/* {errors.name && (
				<p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
			)} */}

			<label className='block mt-4 mb-2 font-semibold'>Возраст</label>
			<input
				type='number'
				{...register('age', {
					required: 'Возраст обязателен',
					min: { value: 14, message: 'Минимум 14 лет' },
					max: { value: 100, message: 'Максимум 100 лет' },
				})}
				defaultValue={user?.age || ''}
				className='input'
				placeholder='Введите возраст'
			/>
			{/* {errors.age && (
				<p className='text-red-500 text-sm mt-1'>{errors.age.message}</p>
			)} */}
		</div>
	)
}
