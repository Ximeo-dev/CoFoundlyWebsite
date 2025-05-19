'use client'

import { Controller, useFormContext } from 'react-hook-form'
import Avatar from '../../profile-info/avatar'
import { DatePicker } from '@/components/ui/date-picker/date-picker'
import { format } from 'date-fns'

export default function PersonalData() {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-center'>
				<Avatar size={512} editable className='w-fit' hasAvatar />
			</div>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Личные данные
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
					Укажите Ваше имя и дату рождения
				</p>
			</div>

			<div>
				<input
					{...register('name')}
					type='text'
					className={`w-full py-1 px-3 h-9 rounded-lg border placeholder:text-[#585654] ${
						errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent  dark:bg-input/30`}
					placeholder='Имя'
				/>
				{errors.name && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.name.message as string}
					</p>
				)}
			</div>

			<div>
				<Controller
					control={control}
					name='birthDate'
					rules={{
						required: 'Дата рождения обязательна',
					}}
					render={({ field }) => (
						<DatePicker
							value={field.value ? new Date(field.value) : undefined}
							onChange={(date: any) => {
								field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
							}}
							startYear={1900}
							endYear={new Date().getFullYear()}
						/>
					)}
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
