'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SkillsModal from './skills-modal'
import { skillsService } from '@/services/skills.service'
import { useQuery } from '@tanstack/react-query'
import { ISkill } from '@/types/skills.types'

export default function SkillsStep() {
  const {
		watch,
		formState: { errors },
	} = useFormContext()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const skills = watch('skills', []) as (string | ISkill)[]

	const { data: allSkills } = useQuery({
		queryKey: ['get skills'],
		queryFn: () => skillsService.getSkills(500),
	})

	const skillNames = skills
		.map(skill => {
			if (typeof skill === 'string') {
				return skill
			}
			return skill.name
		})
		.filter(Boolean)
		.join(', ')

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
					className='w-full py-1 px-3 h-9 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent  dark:bg-input/30 transition-colors duration-300 cursor-pointer'
				>
					{skills.length > 0 ? skillNames : 'Нажмите для выбора навыков...'}
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
