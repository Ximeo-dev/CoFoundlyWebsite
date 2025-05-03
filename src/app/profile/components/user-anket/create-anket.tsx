'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { anketService } from '@/services/anket.service'
import { IAnketRequest } from '@/types/anket.types'
import ConfirmPersonalData from './steps/confirm-personal-data'
import JobStep from './steps/job-step'
import BioStep from './steps/bio-step'
import SkillsStep from './steps/skills-step'
import PortfolioStep from './steps/portfolio-step'
import { toast } from 'sonner'
import { AnketFormData, AnketSchema } from '@/zod/anket.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquareArrowLeft } from 'lucide-react'

export default function CreateAnket({
	existingAnket,
	onCancel,
	onCreated,
}: {
	existingAnket?: any | null
	onCancel: () => void
	onCreated: (updated: any) => void
}) {
	const methods = useForm<AnketFormData>({
		defaultValues: {
			name: existingAnket?.name || '',
			age: existingAnket?.age || '',
			job: existingAnket?.job || '',
			bio: existingAnket?.bio || '',
			skills: existingAnket?.skills || [],
			portfolio: existingAnket?.portfolio ? [existingAnket.portfolio] : [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		resolver: zodResolver(AnketSchema),
		mode: 'onChange',
	})

	const [currentStep, setCurrentStep] = useState(0)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const steps = [
		<ConfirmPersonalData key='0' />,
		<JobStep key='1' />,
		<BioStep key='2' />,
		<SkillsStep key='3' />,
		<PortfolioStep key='4' />,
	]

	const stepFields: (keyof AnketFormData)[][] = [
		['name', 'age'],
		['job'],
		['bio'],
		['skills'],
		['portfolio'],
	]

	const totalSteps = steps.length
	const progress = (currentStep / (totalSteps - 1)) * 100

	const nextStep = async () => {
		const fieldsToValidate = stepFields[currentStep]
		const result = await methods.trigger(fieldsToValidate)

		if (result) {
			setCurrentStep(prev => prev + 1)
		} else {
			toast.error('Пожалуйста, заполните поле')
		}
	}

	const prevStep = () => {
		if (currentStep > 0) setCurrentStep(prev => prev - 1)
	}

	const handleSubmit = async (data: IAnketRequest) => {
		setIsSubmitting(true)
		try {
			const response = existingAnket
				? await anketService.editAnket(data)
				: await anketService.createAnket(data)

			toast.success(existingAnket ? 'Анкета обновлена' : 'Анкета создана')
			onCreated(response)
		} catch (e) {
			toast.error('Ошибка при сохранении анкеты')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className='border-b border-border py-4 px-5 flex justify-between items-center'>
					<button
						type='button'
						onClick={onCancel}
						className='text-sm cursor-pointer'
					>
						<SquareArrowLeft className='text-[#656565] hover:text-[#828282] transition-colors duration-300 w-7 h-7' />
					</button>
					<h2 className='text-lg font-semibold'>Анкета</h2>
					<div className='flex flex-col items-end'>
						<span className='text-sm text-gray-400'>
							Прогресс: {Math.round(progress)}%
						</span>
						<div className='w-[200px] bg-gray-700 rounded-full h-2 mt-1'>
							<div
								className='bg-pink-100 h-2 rounded-full transition-all duration-300'
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>

				<div className='mb-6 mt-6 px-5'>{steps[currentStep]}</div>

				<div className='flex justify-between items-center px-5 pb-10'>
					{currentStep > 0 ? (
						<button
							type='button'
							onClick={prevStep}
							className='px-6 py-3 bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300 transition'
						>
							Назад
						</button>
					) : (
						<div />
					)}

					{currentStep < totalSteps - 1 ? (
						<button
							type='button'
							onClick={nextStep}
							className='px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition'
						>
							Далее
						</button>
					) : (
						<button
							type='submit'
							disabled={isSubmitting}
							className={`px-6 py-3 rounded-full shadow transition ${
								isSubmitting
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-green-500 hover:bg-green-600 text-white'
							}`}
						>
							{isSubmitting ? 'Сохранение...' : 'Завершить'}
						</button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}
