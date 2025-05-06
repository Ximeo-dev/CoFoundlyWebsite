'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/shadcn/input'

export const LanguagesStep = () => {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext()

	const languagesValue = watch('languages') || []

	const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		const languagesArray = inputValue
			.split(',')
			.map(lang => lang.trim())
			.filter(lang => lang.length > 0)

		setValue('languages', languagesArray, { shouldValidate: true })
	}

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Языки
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Укажите языки, которыми владеете (через запятую)
				</p>
			</div>

			<div>
				<Input
					value={languagesValue.join(', ')}
					onChange={handleLanguagesChange}
					className={`w-full ${
						errors.languages
							? 'border-red-500 focus:ring-red-500'
							: 'border-border'
					}`}
					placeholder='Русский'
				/>
				{errors.languages && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.languages.message as string}
					</p>
				)}
			</div>
		</div>
	)
}
