'use client'

import { useFormContext } from 'react-hook-form'

export default function JobStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Род деятельности
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Укажите вашу основную специализацию или должность
				</p>
			</div>

			<div>
				<input
					{...register('job')}
					className={`w-full px-4 py-3 rounded-lg border placeholder:text-[#585654] ${
						errors.job ? 'border-red-500 focus:ring-red-500' : 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700`}
					placeholder='Например: Frontend-разработчик'
				/>
				{errors.job && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.job.message as string}
					</p>
				)}
			</div>
		</div>
	)
}
