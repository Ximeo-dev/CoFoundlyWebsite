'use client'

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

export default function SkillsStep() {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext()

	const selected = watch('skills', [])

	const toggleSkill = (skill: string) => {
		const updated = selected.includes(skill)
			? selected.filter((s: string) => s !== skill)
			: [...selected, skill]
		setValue('skills', updated, { shouldValidate: true })
	}

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

			<div className='flex flex-wrap gap-3'>
				{allSkills.map(skill => (
					<button
						type='button'
						key={skill}
						onClick={() => toggleSkill(skill)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
							selected.includes(skill)
								? 'bg-black dark:bg-white text-white dark:text-black'
								: 'bg-background border border-border'
						}`}
					>
						{skill}
					</button>
				))}
			</div>
			{errors.skills && (
				<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
					{errors.skills.message as string}
				</p>
			)}
		</div>
	)
}
