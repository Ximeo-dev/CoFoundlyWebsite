'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import Avatar from '../../../components/profile-info/avatar'
import { useState } from 'react'
import IndustryModal from '../../../components/user-anket/steps/professional/Industry-modal'
import ProjectIndustryModal from './project-industry-modal'

export default function MainDataStep() {
	const { register, formState: { errors } } = useFormContext()
	const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false)
	const industry = useWatch({ name: 'industry' })

	return (
		<div className='space-y-6'>
			{/* <div className='flex items-center justify-center'>
				<Avatar size={512} editable className='w-fit' />
			</div> */}
			<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
				Личные данные
			</h3>
			<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
				Укажите название Вашего проекта
			</p>
			<div>
				<input
					{...register('name')}
					placeholder='Название'
					type='text'
					className={`w-full py-1 px-3 h-9 rounded-lg border placeholder:text-[#585654] ${
						errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border'
					} focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent  dark:bg-input/30`}
				/>
				{errors.name && (
					<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
						{errors.name.message as string}
					</p>
				)}
			</div>

			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Направление проекта
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
					Укажите направление Вашего проекта
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsIndustryModalOpen(true)}
					className='w-full py-2 px-4  rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer text-base sm:text-sm'
				>
					{industry.length > 0 ? industry : 'Выберите направление'}
				</button>
				{errors.industry && (
					<p className='text-sm text-red-600 dark:text-red-500 mt-1'>
						{errors.industry.message as string}
					</p>
				)}
			</div>
			<ProjectIndustryModal
				isOpen={isIndustryModalOpen}
				onClose={() => setIsIndustryModalOpen(false)}
			/>
		</div>
	)
}