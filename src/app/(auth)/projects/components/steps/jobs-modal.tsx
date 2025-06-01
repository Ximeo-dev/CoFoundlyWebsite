'use client'

import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import { anketService } from '@/services/anket.service'
import { searchSort } from '@/utils/searchSort'
import { useQuery } from '@tanstack/react-query'
import { X, CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function JobsModal({
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
	const selected = watch('jobs', []) as string[]

	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get jobs'],
		queryFn: () => anketService.getProfessional('job', 85),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: isOpen,
	})

	const sortedJobs = useMemo(() => {
		if (!jobs) return []
		return searchSort(jobs, searchQuery)
	}, [jobs, searchQuery])

	const toggleJobs = (jobsName: string) => {
		const updated = selected.includes(jobsName)
			? selected.filter(s => s !== jobsName)
			: [...selected, jobsName]
		setValue('jobs', updated, { shouldValidate: true })
	}

	const resetJobs = () => {
		setValue('jobs', [], { shouldValidate: true })
		onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className='w-[90vw] max-w-[400px] sm:max-w-[450px] min-h-[400px] mx-auto'
		>
			<div className='px-4 pt-4 sm:px-6 sm:pt-6 flex flex-col h-full'>
				<h3 className='text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>
					Выберите работы
				</h3>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск...'
					className='w-full p-2 mb-4 border rounded-lg focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
				/>
				<div className='flex flex-wrap gap-2 min-h-[200px] max-h-[50vh] overflow-y-auto'>
					{isLoading ? (
						<div className='text-center w-full text-gray-500 dark:text-gray-400'>
							Загрузка...
						</div>
					) : sortedJobs.length === 0 ? (
						<div className='text-center w-full text-gray-500 dark:text-gray-400'>
							Ничего не найдено
						</div>
					) : (
						sortedJobs.map(job => (
							<button
								type='button'
								key={job.name}
								onClick={() => toggleJobs(job.name)}
								className={`px-3 shrink-0 py-1.5 rounded-full text-sm transition-colors ${
									selected.includes(job.name)
										? 'bg-black dark:bg-white text-white dark:text-black'
										: 'bg-background border border-border text-gray-900 dark:text-gray-100'
								}`}
							>
								{job.name}
							</button>
						))
					)}
				</div>
				{errors.jobs && (
					<p className='mt-3 text-sm text-red-600 dark:text-red-500'>
						{errors.jobs.message as string}
					</p>
				)}
				<div className='sticky bottom-0 left-0 bg-background px-4 py-3 flex justify-center gap-3 sm:gap-8 z-10'>
					<Button
						variant='destructive'
						onClick={resetJobs}
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
