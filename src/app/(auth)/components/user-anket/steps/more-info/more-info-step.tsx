'use client'

import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import LanguageModal from './language-modal'
import { Input } from '@/components/ui/shadcn/input'
import { Button } from '@/components/ui/shadcn/button'

export default function MoreInfoStep() {
	const {
		watch,
		formState: { errors },
		control,
		register,
	} = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'portfolio',
	})

	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
	const languages = watch('languages', []) as string[]

	const languagesNames = languages
		.map(language => language)
		.filter(Boolean)
		.join(', ')

	return (
		<div className='space-y-6 sm:space-y-4'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Языки
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
					Укажите Ваши языки общения
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsLanguageModalOpen(true)}
					className='w-full py-2 px-4 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer text-base sm:text-sm'
				>
					{languages.length > 0 ? languagesNames : 'Выберите языки'}
				</button>
				{errors.languages && (
					<p className='text-sm text-red-600 dark:text-red-500 mt-1'>
						{errors.languages.message as string}
					</p>
				)}
			</div>

			<div className='space-y-4 sm:space-y-3'>
				<div>
					<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
						Портфолио
					</h3>
					<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
						Можете добавить свое портфолио
					</p>
				</div>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'
					>
						<Input
							{...register(`portfolio.${index}`)}
							placeholder='https://example.com'
							className='flex-1 text-base sm:text-sm h-11'
						/>
						<Button
							type='button'
							variant='destructive'
							onClick={() => remove(index)}
							className='h-11 w-full sm:w-auto px-4'
						>
							Удалить
						</Button>
					</div>
				))}

				<Button
					type='button'
					variant='outline'
					onClick={() => append('')}
					className='h-11 w-full text-base sm:text-sm'
				>
					Добавить ссылку
				</Button>
			</div>

			<LanguageModal
				isOpen={isLanguageModalOpen}
				onClose={() => setIsLanguageModalOpen(false)}
			/>
		</div>
	)
}
