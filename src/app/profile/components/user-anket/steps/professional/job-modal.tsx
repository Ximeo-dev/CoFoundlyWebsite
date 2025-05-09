'use client'

import Modal from '@/components/ui/modal/modal'
import { anketService } from '@/services/anket.service'
import { searchSort } from '@/utils/searchSort'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function JobModal({
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
	const selectedJob = watch('job', '') as string

	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get jobs'],
		queryFn: () => anketService.getProfessional('job', 70),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: isOpen,
	})

	const sortedJobs = useMemo(() => {
		if (!jobs) return []
		return searchSort(jobs, searchQuery)
	}, [jobs, searchQuery])

	const selectJob = (jobName: string) => {
		setValue('job', jobName, { shouldValidate: true })
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className='w-[350px] sm:w-full sm:max-w-md'
		>
			<div className='p-6'>
				<h3 className='text-xl font-semibold mb-4'>Выберите род деятельности</h3>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск...'
					className='w-full p-2 mb-4 border rounded-lg focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
				/>
				<div className='flex flex-wrap gap-2 max-h-96 overflow-y-auto'>
					{isLoading ? (
						<div className='text-center'>Загрузка...</div>
					) : (
						sortedJobs.map(job => (
							<button
								type='button'
								key={job.name}
								onClick={() => selectJob(job.name)}
								className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
									selectedJob === job.name
										? 'bg-black dark:bg-white text-white dark:text-black'
										: 'bg-background border border-border'
								}`}
							>
								{job.name}
							</button>
						))
					)}
				</div>
				{errors.job && (
					<p className='mt-3 text-sm text-red-600 dark:text-red-500'>
						{errors.job.message as string}
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
