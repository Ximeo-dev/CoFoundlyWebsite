'use client'

import { ISkill } from '@/types/skills.types'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import SkillsModal from '../../../components/user-anket/steps/professional/skills-modal'
import JobModal from '../../../components/user-anket/steps/professional/job-modal'
import LanguageModal from '../../../components/user-anket/steps/more-info/language-modal'
import JobsModal from './jobs-modal'

export default function ProjectProfessionalStep() {
	const {
		watch,
		formState: { errors },
	} = useFormContext()

	const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
	const [isJobModalOpen, setIsJobModalOpen] = useState(false)
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)

	const skills = watch('skills', []) as (string | ISkill)[]
	const jobs = watch('jobs', []) as string[]
	const languages = watch('languages', []) as string[]

	const skillNames = skills
		.map(skill => (typeof skill === 'string' ? skill : skill.name))
		.filter(Boolean)
		.join(', ')

	const jobsNames = jobs.filter(Boolean).join(', ')
	const languagesNames = languages
		.map(language => language)
		.filter(Boolean)
		.join(', ')

	return (
		<div className='space-y-6 sm:space-y-4'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Работы, задействованные в проекте
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
					Укажите роли или работы, которые необходимы для реализации проекта.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsJobModalOpen(true)}
					className='w-full py-2 px-4 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer text-base sm:text-sm'
				>
					{jobs.length > 0 ? jobsNames : 'Выберите работы'}
				</button>
				{errors.jobs && (
					<p className='text-sm text-red-600 dark:text-red-500 mt-1'>
						{errors.jobs.message as string}
					</p>
				)}
			</div>

			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Навыки, необходимые для проекта
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
					Выберите навыки, которые соответствуют задачам проекта.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<button
					type='button'
					onClick={() => setIsSkillModalOpen(true)}
					className='w-full py-2 px-4 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30 transition-colors duration-300 cursor-pointer text-base sm:text-sm'
				>
					{skills.length > 0 ? skillNames : 'Выберите навыки'}
				</button>
				{errors.skills && (
					<p className='text-sm text-red-600 dark:text-red-500 mt-1'>
						{errors.skills.message as string}
					</p>
				)}
			</div>

			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Языки
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-3 sm:mb-2'>
					Укажите языки общения в вашем проекте.
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

			<SkillsModal
				isOpen={isSkillModalOpen}
				onClose={() => setIsSkillModalOpen(false)}
			/>
			<JobsModal
				isOpen={isJobModalOpen}
				onClose={() => setIsJobModalOpen(false)}
			/>
			<LanguageModal
				isOpen={isLanguageModalOpen}
				onClose={() => setIsLanguageModalOpen(false)}
			/>
		</div>
	)
}
