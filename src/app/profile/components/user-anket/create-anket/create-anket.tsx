'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { anketService } from '@/services/anket.service'
import { IAnketRequest } from '@/types/anket.types'
import { toast } from 'sonner'
import { AnketFormData, AnketSchema } from '@/zod/anket.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ConfirmPersonalData from '../steps/confirm-personal-data'
import JobStep from '../steps/job-step'
import BioStep from '../steps/bio-step'
import SkillsStep from '../steps/skills-step'
import PortfolioStep from '../steps/portfolio-step'

export default function CreateAnket({
	onCreated,
}: {
	onCreated: (created: any) => void
}) {
	const methods = useForm<any>({
		defaultValues: {
			job: '',
			bio: '',
			skills: [],
			portfolio: [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		resolver: zodResolver(AnketSchema),
		mode: 'onChange',
	})

	const [currentStep, setCurrentStep] = useState(0)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const steps = [
		{ component: <ConfirmPersonalData key='0' />, title: 'Личные данные' },
		{ component: <JobStep key='1' />, title: 'Род деятельности' },
		{ component: <BioStep key='2' />, title: 'О себе' },
		{ component: <SkillsStep key='3' />, title: 'Навыки' },
		{ component: <PortfolioStep key='4' />, title: 'Портфолио' },
	]

	const stepFields: (keyof AnketFormData)[][] = [
		[],
		['job'],
		['bio'],
		['skills'],
		['portfolio'],
	]

	const totalSteps = steps.length
	const progress = (currentStep / (totalSteps - 1)) * 100

	const nextStep = async () => {
		if (currentStep !== 0) {
			const fieldsToValidate = stepFields[currentStep]
			const result = await methods.trigger(fieldsToValidate)

			if (!result) {
				// toast.error('Пожалуйста, заполните все обязательные поля')
				return
			}
		}

		setCurrentStep(prev => prev + 1)
	}

	const prevStep = () => {
		if (currentStep > 0) setCurrentStep(prev => prev - 1)
	}

	const handleSubmit = async (data: IAnketRequest) => {
		setIsSubmitting(true)
		try {
			const response = await anketService.createAnket(data)
			toast.success('Анкета успешно создана!')
			onCreated(response)
		} catch (e) {
			toast.error('Ошибка при создании анкеты')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className='py-4 px-6 flex justify-between items-center'>
					<div className='flex flex-col items-center'>
						<h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
							Создание анкеты
						</h2>
						<p className='text-sm text-gray-500 dark:text-neutral-500 mt-1'>
							Шаг {currentStep + 1} из {totalSteps}: {steps[currentStep].title}
						</p>
					</div>

					<div className='flex flex-col items-end w-44'>
						<div className='w-32 md:w-44'>
							<span className='text-xs text-muted-foreground block mb-1'>
								Заполнено на {progress}%
							</span>
							<div className='w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2'>
								<div
									className='bg-primary h-2 rounded-full transition-all duration-500'
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-center py-4 border-t border-border rounded-tl-[15px] rounded-tr-[15px]'>
					<div className='flex space-x-4'>
						{steps.map((_, index) => (
							<button
								key={index}
								type='button'
								onClick={() => setCurrentStep(index)}
								disabled={index > currentStep}
								className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
									index === currentStep
										? 'bg-black text-white dark:bg-white dark:text-black'
										: index < currentStep
										? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
										: 'bg-white dark:bg-[#111111] border-border border text-black dark:text-gray-400'
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>

				<div className='px-6 pb-6 pt-4'>
					<div className='mb-8'>{steps[currentStep].component}</div>

					<div className='flex justify-between items-center pt-4 border-t border-border'>
						{currentStep > 0 ? (
							<button
								type='button'
								onClick={prevStep}
								className='px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 dark:bg-[#EDEDED] dark:text-black dark:hover:bg-white/80 transition-colors duration-300 flex items-center gap-1 cursor-pointer'
							>
								<ArrowLeft size={18} />
								Назад
							</button>
						) : (
							<div />
						)}

						{currentStep < totalSteps - 1 ? (
							<button
								type='button'
								onClick={nextStep}
								className='px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 dark:bg-[#EDEDED] dark:text-black dark:hover:bg-white/80 transition-colors duration-300 flex items-center gap-1 cursor-pointer ml-auto'
							>
								Далее
								<ArrowRight size={18} />
							</button>
						) : (
							<button
								type='submit'
								disabled={isSubmitting}
								className={`px-6 py-2.5 rounded-lg transition flex items-center gap-1 ${
									isSubmitting
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-black text-white dark:bg-white dark:text-black'
								}`}
							>
								{isSubmitting ? (
									<>
										<svg
											className='animate-spin -ml-1 mr-2 h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
										Сохранение...
									</>
								) : (
									<>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
										Завершить
									</>
								)}
							</button>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
