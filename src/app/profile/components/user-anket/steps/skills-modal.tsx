'use client'

import Modal from '@/components/ui/modal/modal'
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

	const selected = watch('skills', [])

	const toggleSkill = (skill: string) => {
		const updated = selected.includes(skill)
			? selected.filter((s: string) => s !== skill)
			: [...selected, skill]
		setValue('skills', updated, { shouldValidate: true })
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} className='max-w-md w-full'>
			<div className='p-6'>
				<h3 className='text-xl font-semibold mb-4'>Выберите навыки</h3>
				<div className='flex flex-wrap gap-2'>
					{allSkills.map(skill => (
						<button
							type='button'
							key={skill}
							onClick={() => toggleSkill(skill)}
							className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
