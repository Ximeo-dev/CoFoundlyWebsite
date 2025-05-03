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

export default function CreateAnket({
	existingAnket,
	onCreated,
}: {
	existingAnket?: any | null
	onCreated: () => void
}) {
	const methods = useForm<any>({
		defaultValues: {
			name: existingAnket?.name || '',
			age: existingAnket?.age || '',
			job: existingAnket?.job || '',
			bio: existingAnket?.bio || '',
			skills: existingAnket?.skills || [],
			portfolio: existingAnket?.portfolio ? [existingAnket.portfolio] : [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
	})

	const [currentStep, setCurrentStep] = useState(0)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const steps = [
		<ConfirmPersonalData />,
		<JobStep />,
		<BioStep />,
		<SkillsStep />,
		<PortfolioStep />,
	]

	const totalSteps = steps.length
	const progress = (currentStep / (totalSteps - 1)) * 100

	const nextStep = () => {
		if (currentStep < totalSteps - 1) {
			setCurrentStep(prev => prev + 1)
		}
	}

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1)
		}
	}

	const handleSubmit = async (data: IAnketRequest) => {
		setIsSubmitting(true)
		try {
			if (existingAnket) {
				await anketService.editAnket(data)
				onCreated()
			} else {
				await anketService.createAnket(data)
				onCreated()
			}
		} catch (error) {
			console.error('Ошибка при сохранении анкеты:', error)
			toast.error('Ошибка при сохранении анкеты')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleSubmit)}
				className='max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl'
			>
				<div className='relative pt-1 pb-6'>
					<div className='flex mb-2 justify-between'>
						<span className='text-sm text-gray-500'>Прогресс</span>
						<span className='text-sm font-semibold text-gray-500'>
							{Math.round(progress)}%
						</span>
					</div>
					<div className='h-2 mb-4 bg-gray-200 rounded-full'>
						<div
							className='h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out'
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>

				<div className='mb-6'>{steps[currentStep]}</div>

				<div className='flex justify-between mt-8'>
					{currentStep > 0 && (
						<button
							type='button'
							onClick={prevStep}
							className='px-6 py-3 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 transition-all duration-200'
						>
							Назад
						</button>
					)}
					<div className='flex gap-4'>
						{currentStep < totalSteps - 1 ? (
							<button
								type='button'
								onClick={nextStep}
								className='px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-200'
							>
								Далее
							</button>
						) : (
							<button
								type='submit'
								disabled={isSubmitting}
								className={`px-6 py-3 ${
									isSubmitting ? 'bg-gray-400' : 'bg-green-500'
								} text-white rounded-full shadow-md hover:bg-green-600 transition-all duration-200`}
							>
								{isSubmitting ? 'Сохранение...' : 'Завершить'}
							</button>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}
