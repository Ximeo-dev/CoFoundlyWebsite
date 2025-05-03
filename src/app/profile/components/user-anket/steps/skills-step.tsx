'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SkillsModal from './skills-modal'

export default function SkillsStep() {
	const {
		watch,
		formState: { errors },
	} = useFormContext()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const skills = watch('skills', [])

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Ваши навыки
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Выберите навыки, которые соответствуют вашей специализации
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsModalOpen(true)}
					className='w-full px-4 py-3 rounded-lg text-left border bg-background border-border hover:border-[#999999] dark:hover:bg-[#171717] dark:hover:border-[#444444] transition-colors duration-300 cursor-pointer'
				>
					{skills.length > 0
						? skills.join(', ')
						: 'Нажмите для выбора навыков...'}
				</button>
				{errors.skills && (
					<p className='text-sm text-red-600 dark:text-red-500'>
						{errors.skills.message as string}
					</p>
				)}
			</div>

			<SkillsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	)
}
