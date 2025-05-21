'use client'

import { useFormContext } from 'react-hook-form'

export default function DescriptionStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					О проекте
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
					Расскажите о своем проекте, его особенностях и целях. Это поможет
					другим лучше понять Вашу идею.
				</p>
			</div>

			<div>
				<textarea
					{...register('description')}
					rows={5}
					className={`w-full px-4 py-3 rounded-lg border placeholder:text-[#585654] ${
						errors.description
							? 'border-red-500 focus:ring-red-500'
							: 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30`}
					placeholder='Кратко опишите проект'
				/>
				{errors.description && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.description.message as string}
					</p>
				)}
			</div>
		</div>
	)
}
