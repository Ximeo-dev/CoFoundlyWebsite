'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SkillsModal from './skills-modal'
import { ISkill } from '@/types/skills.types'
import JobModal from './job-modal'
import IndustryModal from './Industry-modal'

export default function ProfessionalStep() {
	const {
		watch,
		formState: { errors },
	} = useFormContext()

	const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
	const [isJobModalOpen, setIsJobModalOpen] = useState(false)
	const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false)
	const skills = watch('skills', []) as (string | ISkill)[]
	const job = watch('job', '') as string
	const industries = watch('industries', []) as string[]

	const skillNames = skills
		.map(skill => (typeof skill === 'string' ? skill : skill.name))
		.filter(Boolean)
		.join(', ')

	const industryNames = industries.filter(Boolean).join(', ')

	return (
		<div className='space-y-8'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Род деятельности
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
					Укажите Вашу основную специализацию или должность
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsJobModalOpen(true)}
					className='w-full py-1 px-3 h-9 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer'
				>
					{job ? job : 'Нажмите для выбора рода деятельности'}
				</button>
				{errors.job && (
					<p className='text-sm text-red-600 dark:text-red-500'>
						{errors.job.message as string}
					</p>
				)}
			</div>

			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Ваши навыки
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
					Выберите навыки, которые соответствуют Вашей специализации
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsSkillModalOpen(true)}
					className='w-full py-1 px-3 h-9 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer'
				>
					{skills.length > 0 ? skillNames : 'Нажмите для выбора навыков...'}
				</button>
				{errors.skills && (
					<p className='text-sm text-red-600 dark:text-red-500'>
						{errors.skills.message as string}
					</p>
				)}
			</div>

			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Интересующие ниши
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-4'>
					Укажите интересующие Вас ниши
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsIndustryModalOpen(true)}
					className='w-full py-1 px-3 h-9 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer'
				>
					{industries.length > 0
						? industryNames
						: 'Нажмите для выбора интересующих Вас ниш'}
				</button>
				{errors.industries && (
					<p className='text-sm text-red-600 dark:text-red-500'>
						{errors.industries.message as string}
					</p>
				)}
			</div>

			<SkillsModal
				isOpen={isSkillModalOpen}
				onClose={() => setIsSkillModalOpen(false)}
			/>
			<JobModal
				isOpen={isJobModalOpen}
				onClose={() => setIsJobModalOpen(false)}
			/>
			<IndustryModal
				isOpen={isIndustryModalOpen}
				onClose={() => setIsIndustryModalOpen(false)}
			/>
		</div>
	)
}
