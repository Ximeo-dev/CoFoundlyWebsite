'use client'

import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import { anketService } from '@/services/anket.service'
import { searchSort } from '@/utils/searchSort'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { X, CheckCircle2 } from 'lucide-react'

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
	const selected = watch('skills', []) as string[]

	const { data: skills, isLoading } = useQuery({
		queryKey: ['get skills'],
		queryFn: () => anketService.getProfessional('skill', 500),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: isOpen,
	})

	const sortedSkills = useMemo(() => {
		if (!skills) return []
		return searchSort(skills, searchQuery)
	}, [skills, searchQuery])

	const toggleSkill = (skillId: string) => {
		const updated = selected.includes(skillId)
			? selected.filter(s => s !== skillId)
			: [...selected, skillId]
		setValue('skills', updated, { shouldValidate: true })
	}

	const resetSkills = () => {
		setValue('skills', [], { shouldValidate: true })
		onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className='w-full max-w-[95vw] sm:max-w-md px-4'
		>
			<div className='w-full max-w-[450px] min-h-[450px] mx-auto flex flex-col'>
				<div className='px-4 pt-4 sm:px-6 sm:pt-6 flex flex-col h-full'>
					<h3 className='text-xl font-semibold mb-4'>Выберите навыки</h3>

					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Поиск навыков...'
						className='w-full p-2 mb-4 border rounded-lg focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
					/>

					<div className='flex-1 overflow-y-auto mb-4 pr-1 scroll-smooth max-h-[300px]'>
						{isLoading ? (
							<div className='text-center'>Загрузка...</div>
						) : (
							<div className='flex flex-wrap gap-2'>
								{sortedSkills.map(skill => (
									<button
										type='button'
										key={skill.name}
										onClick={() => toggleSkill(skill.name)}
										className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 border shrink-0 ${
											selected.includes(skill.name)
												? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
												: 'bg-background text-gray-800 dark:text-gray-100 border-border hover:bg-accent/30'
										}`}
									>
										{skill.name}
									</button>
								))}
							</div>
						)}
					</div>

					{errors.skills && (
						<p className='mt-2 text-sm text-red-600 dark:text-red-500'>
							{errors.skills.message as string}
						</p>
					)}
				</div>

				<div className='sticky bottom-0 left-0 bg-background px-4 py-3 flex justify-center gap-3 sm:gap-8 z-10'>
					<Button
						variant='destructive'
						onClick={resetSkills}
						className='flex items-center gap-2 text-sm sm:text-base justify-center'
					>
						<X className='w-4 h-4' /> Сбросить
					</Button>
					<Button
						onClick={onClose}
						className='bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-white/90 flex items-center gap-2 text-sm sm:text-base justify-center'
					>
						<CheckCircle2 className='w-4 h-4' /> Готово
					</Button>
				</div>
			</div>
		</Modal>
	)
}
