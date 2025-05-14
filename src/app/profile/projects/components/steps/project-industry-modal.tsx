'use client'

import Modal from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/shadcn/button'
import { anketService } from '@/services/anket.service'
import { searchSort } from '@/utils/searchSort'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function ProjectIndustryModal({
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
  const selectedIndustry = watch('industry', '') as string

  const { data: industry, isLoading } = useQuery({
		queryKey: ['get industries'],
		queryFn: () => anketService.getProfessional('industry', 100),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: isOpen,
	})

  const sortedIndustries = useMemo(() => {
		if (!industry) return []
		return searchSort(industry, searchQuery)
	}, [industry, searchQuery])

  const selectIndustry = (industryName: string) => {
		console.log('Выбранная ниша:', industryName)
		setValue('industry', industryName, { shouldValidate: true })
	}

  const resetIndustry = () => {
    setValue('industry', '', { shouldValidate: true })
    onClose()
  }

  return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className='w-[90vw] max-w-[400px] sm:max-w-[450px] min-h-[400px] mx-auto'
		>
			<div className='p-4 sm:p-6 flex flex-col h-full'>
					<h3 className='text-xl font-semibold mb-4'>Выберите нишу</h3>
					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Поиск...'
						className='w-full p-2 mb-4 border rounded-lg focus:outline-none text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 transition-colors duration-300 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent dark:bg-input/30'
					/>
					<div className='flex-1 min-h-0 overflow-y-auto flex flex-wrap gap-2 max-h-96 overflow-y-auto'>
						{isLoading ? (
							<div className='text-center'>Загрузка...</div>
						) : (
							sortedIndustries.map((industry, i) => (
								<button
									type='button'
									key={industry.name || i}
									onClick={() => selectIndustry(industry.name)}
									className={`px-3 shrink-0 py-1.5 rounded-full text-sm transition-colors ${
										selectedIndustry === industry.name
											? 'bg-black dark:bg-white text-white dark:text-black'
											: 'bg-background border border-border'
									}`}
								>
									{industry.name}
								</button>
							))
						)}
					</div>
					{errors.industry && (
						<p className='mt-3 text-sm text-red-600 dark:text-red-500'>
							{errors.industry.message as string}
						</p>
					)}
					<div className='flex-none mt-6 flex justify-center gap-6'>
						<Button
							variant={'destructive'}
							onClick={resetIndustry}
							className='flex items-center gap-1 cursor-pointer'
						>
							Сбросить
						</Button>
						<button
							type='button'
							onClick={onClose}
							className='h-9 px-4 py-2 bg-black text-white hover:bg-neutral-700 dark:bg-[#EDEDED] dark:text-black dark:hover:bg-white/80 transition-colors duration-300 flex items-center gap-1 cursor-pointer rounded-lg'
						>
							Готово
						</button>
					</div>
				</div>
		</Modal>
	)
}
