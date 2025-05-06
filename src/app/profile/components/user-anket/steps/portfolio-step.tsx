'use client'

import { useFormContext } from 'react-hook-form'

export default function PortfolioStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Портфолио
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Добавьте ссылку на ваш лучший проект или портфолио
				</p>
			</div>

			<div>
				<input
					{...register('portfolio')}
					className={`w-full px-4 py-3 rounded-lg border placeholder:text-[#585654] border-border focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent selection:bg-primary dark:bg-input/30`}
					placeholder='https://github.com/username'
				/>
			</div>
		</div>
	)
}
