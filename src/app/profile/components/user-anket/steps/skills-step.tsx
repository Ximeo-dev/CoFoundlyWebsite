import { useFormContext } from 'react-hook-form'

const allSkills = ['React', 'Node.js', 'Python', 'Docker', 'Figma', 'SQL']

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
		<div>
			<label className='block mb-4 font-semibold'>Выбери свои навыки</label>
			<div className='flex flex-wrap gap-2'>
				{allSkills.map(skill => (
					<button
						type='button'
						key={skill}
						onClick={() => toggleSkill(skill)}
						className={`px-3 py-1 rounded-full border ${
							selected.includes(skill)
								? 'bg-blue-500 text-white'
								: 'bg-white text-gray-700'
						}`}
					>
						{skill}
					</button>
				))}
			</div>
			{errors.skills && (
				<p className='text-red-500 text-sm mt-2'>
					{errors.skills.message as string}
				</p>
			)}
		</div>
	)
}
