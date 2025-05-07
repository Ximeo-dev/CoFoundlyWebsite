'use client'

import { IAnketRequest } from '@/types/anket.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import PersonalData from './user-anket/steps/personal-data'
import JobStep from './user-anket/steps/job-step'
import BioStep from './user-anket/steps/bio-step'
import SkillsStep from './user-anket/steps/skills-step'
import PortfolioStep from './user-anket/steps/portfolio-step'
import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react'
import { AnketFormSchema, AnketFormType } from '@/zod/anket.schema'
import { Button } from '@/components/ui/shadcn/button'
import { LanguagesStep } from './user-anket/steps/languages-step'
import Tooltip from '@/components/ui/tooltip/tooltip'

interface IAnketForm {
	initialValues?: Partial<IAnketRequest>
	onSubmit: (data: IAnketRequest) => Promise<void>
	mode?: 'create' | 'edit'
	submitButtonText?: string
	onCancel?: () => void
}

export default function AnketForm({
	initialValues,
	onSubmit,
	mode = 'create',
	submitButtonText = mode === 'edit' ? 'Сохранить изменения' : 'Создать анкету',
	onCancel
}: IAnketForm) {
	const methods = useForm<AnketFormType>({
		defaultValues: {
			name: '',
			birthDate: '',
			bio: '',
			job: '',
			skills: [],
			languages: [],
			portfolio: [],
			...(initialValues && {
				...initialValues,
				skills:
					initialValues.skills?.map((skill: any) =>
						typeof skill === 'object' ? skill.id : skill
					) || [],
			}),
		},
		resolver: zodResolver(AnketFormSchema),
		mode: 'onChange',
	})

	const [currentStep, setCurrentStep] = useState(0)
	const [isFormSubmitting, setIsFormSubmitting] = useState(false)

	const steps = [
		{ component: <PersonalData key='0' />, title: 'Личные данные' },
		{ component: <JobStep key='1' />, title: 'Род деятельности' },
		{ component: <BioStep key='2' />, title: 'О себе' },
		{ component: <SkillsStep key='3' />, title: 'Навыки' },
		{ component: <LanguagesStep key='4' />, title: 'Языки' },
		{ component: <PortfolioStep key='5' />, title: 'Портфолио' },
	]

	const stepFields: (keyof AnketFormType)[][] = [
		['name', 'birthDate'],
		['job'],
		['bio'],
		['skills'],
		['languages'],
		['portfolio'],
	]

	const totalSteps = steps.length

	const nextStep = async () => {
		const fieldsToValidate = stepFields[currentStep]
		const isValid = await methods.trigger(fieldsToValidate)

		if (isValid) {
			setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
		}
	}

	const prevStep = () => {
		setCurrentStep(prev => Math.max(prev - 1, 0))
	}

	const submitHandler = async (data: AnketFormType) => {
		try {
			const transformedData = {
				...data,
				skills: data.skills?.map((skill: any) =>
					typeof skill === 'object' ? skill.id : skill
				),
				portfolio: data.portfolio?.map(link => link.trim()),
			}
			await onSubmit(transformedData)
		} catch (error) {
		}
	}

	const filledFieldsCount = useMemo(() => {
		const values = methods.getValues()
		let filled = 0
		let total = 0

		stepFields.forEach(fields => {
			fields.forEach(field => {
				total++
				const value = values[field]

				if (
					(typeof value === 'string' && value.trim() !== '') ||
					(Array.isArray(value) && value.length > 0)
				) {
					filled++
				}
			})
		})

		return { filled, total }
	}, [methods.watch()])

	const progress = Math.round(
		(filledFieldsCount.filled / filledFieldsCount.total) * 100
	)

	const confirm = async () => {
		const fieldsToValidate = stepFields[currentStep]
		const isValid = await methods.trigger(fieldsToValidate)

		if (isValid) {
			methods.handleSubmit(submitHandler)()
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				className='space-y-6'
			>
				<div className='py-4 px-6 flex justify-between items-center mb-0'>
					<div className='flex flex-col'>
						<h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
							{mode === 'edit' ? 'Редактирование анкеты' : 'Создание анкеты'}
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
						{steps.map((step, index) => (
							<Tooltip key={index} text={step.title}>
								<button
									type='button'
									onClick={() => setCurrentStep(index)}
									disabled={mode !== 'edit' && index > currentStep}
									className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer ${
										index === currentStep
											? 'bg-black text-white dark:bg-white dark:text-black'
											: index < currentStep
											? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
											: 'bg-white dark:bg-[#111111] border-border border text-black dark:text-gray-400'
									}`}
								>
									{index + 1}
								</button>
							</Tooltip>
						))}
					</div>
				</div>

				<div className='px-6 pb-6 pt-4'>
					<div className='mb-8'>{steps[currentStep].component}</div>

					<div className='flex justify-between items-center pt-4 border-t border-border'>
						<div className='flex gap-2'>
							{currentStep > 0 ? (
								<Button
									type='button'
									onClick={prevStep}
									variant='outline'
									className='gap-1'
								>
									<ArrowLeft size={18} />
									Назад
								</Button>
							) : null}
							{mode === 'edit' && (
								<Button
									type='button'
									onClick={onCancel}
									className='gap-1'
								>
									Отменить изменения
								</Button>
							)}
						</div>

						{currentStep < totalSteps - 1 ? (
							<Button
								type='button'
								onClick={nextStep}
								className='gap-1 ml-auto'
							>
								Далее
								<ArrowRight size={18} />
							</Button>
						) : (
							<Button
								type='button'
								onClick={confirm}
								disabled={isFormSubmitting}
								className='gap-1'
							>
								{isFormSubmitting ? (
									<>
										Обработка...
										<Loader />
									</>
								) : (
									submitButtonText
								)}
							</Button>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}