'use client'

import Modal from '@/components/ui/modal/modal'
import { skillsService } from '@/services/skills.service'
import { ISkill } from '@/types/skills.types'
import { SkillsSort } from '@/utils/skillsSort'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const allSkills = [
	'React',
	'Node.js',
	'Python',
	'Docker',
	'Figma',
	'SQL',
	'TypeScript',
	'GraphQL',
	'AWS',
	'UI/UX',
	'PostgreSQL',
	'MongoDB',
	'Git',
	'Redux',
]

export default function SkillsModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext()

  const [searchQuery, setSearchQuery] = useState('')
	const selected = watch('skills', [])
	
  const { data: skills, isLoading } = useQuery({
		queryKey: ['get skills'],
		queryFn: () => skillsService.getSkills(500),
		select: (data: ISkill[]) => SkillsSort(data, searchQuery),
	})

	const toggleSkill = (skill: string) => {
		const updated = selected.includes(skill)
			? selected.filter((s: string) => s !== skill)
			: [...selected, skill]
		setValue('skills', updated, { shouldValidate: true })
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} className='w-[350px] sm:w-full sm:max-w-md'>
			<div className='p-6'>
				<h3 className='text-xl font-semibold mb-4'>Выберите навыки</h3>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск навыков...'
					className='w-full p-2 mb-4 border rounded-lg bg-background text-gray-900 dark:text-gray-100'
				/>
				<div className='flex flex-wrap gap-2 max-h-96 overflow-y-auto'>
					{isLoading ? (
          <div className='text-center'>Загрузка...</div>
        ) : (
          <div className='flex flex-wrap gap-2 max-h-96 overflow-y-auto'>
            {skills?.map((skill: ISkill) => (
              <button
                type='button'
                key={skill.id}
                onClick={() => toggleSkill(skill.name)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selected.includes(skill.name)
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-background border border-border'
                }`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        )}
				</div>
				{errors.skills && (
					<p className='mt-3 text-sm text-red-600 dark:text-red-500'>
						{errors.skills.message as string}
					</p>
				)}
				<div className='mt-8 flex justify-center'>
					<button
						type='button'
						onClick={onClose}
						className='px-4 py-2 bg-black text-white hover:bg-neutral-700 dark:bg-[#EDEDED] dark:text-black dark:hover:bg-white/80 transition-colors duration-300 flex items-center gap-1 cursor-pointer rounded-lg'
					>
						Готово
					</button>
				</div>
			</div>
		</Modal>
	)
}
