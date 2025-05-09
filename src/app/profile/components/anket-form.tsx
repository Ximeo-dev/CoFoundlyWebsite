'use client'

import { IAnketRequest } from '@/types/anket.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import PersonalData from './user-anket/steps/personal-data'
import BioStep from './user-anket/steps/bio-step'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react'
import {
	AnketFormSchema,
	AnketFormType,
	AnketFormValues,
} from '@/zod/anket.schema'
import { Button } from '@/components/ui/shadcn/button'
import Tooltip from '@/components/ui/tooltip/tooltip'
import ProfessionalStep from './user-anket/steps/professional/professional-step'
import MoreInfoStep from './user-anket/steps/more-info/more-info-step'

interface IAnketForm {
	initialValues?: AnketFormValues
	onSubmit: (data: IAnketRequest) => Promise<void>
	mode?: 'create' | 'edit'
	submitButtonText?: string
	onCancel?: () => void
	userId: string | undefined
}

export default function AnketForm({
	initialValues,
	onSubmit,
	mode = 'create',
	submitButtonText = mode === 'edit' ? 'Сохранить изменения' : 'Создать анкету',
	onCancel,
	userId
}: IAnketForm) {
	const localStorageKey = `anketFormData-${userId}`
	const stepStorageKey = `anketFormStep-${userId}`

	const savedData = useMemo(() => {
		try {
			const stored = localStorage.getItem(localStorageKey)
			return stored ? JSON.parse(stored) : undefined
		} catch {
			return undefined
		}
	}, [])

	const savedStep = useMemo(() => {
		try {
			const stored = localStorage.getItem(stepStorageKey)
			return stored ? parseInt(stored, 10) : 0
		} catch {
			return 0
		}
	}, [])

	const methods = useForm<AnketFormType>({
		defaultValues: {
			name: '',
			birthDate: '',
			bio: '',
			job: '',
			skills: [],
			industries: [],
			languages: [],
			portfolio: [],
			...(savedData && mode !== 'edit' ? savedData : {}),
			...(initialValues && {
				name: initialValues.name || '',
				birthDate: initialValues.birthDate || '',
				bio: initialValues.bio || '',
				job:
					initialValues.job && typeof initialValues.job === 'object'
						? initialValues.job.name
						: initialValues.job || '',
				skills:
					initialValues.skills?.map((skill: any) =>
						typeof skill === 'object' ? skill.name : skill
					) || [],
				languages:
					initialValues.languages?.map((lang: any) =>
						typeof lang === 'object' ? lang.name : lang
					) || [],
				industries:
					initialValues.industries?.map((industry: any) =>
						typeof industry === 'object' ? industry.name : industry
					) || [],
				portfolio: initialValues.portfolio || [],
			}),
		},
		resolver: zodResolver(AnketFormSchema),
		mode: 'onChange',
	})

	const [currentStep, setCurrentStep] = useState(savedStep)
	const [isFormSubmitting, setIsFormSubmitting] = useState(false)

	useEffect(() => {
		const subscription = methods.watch(value => {
			localStorage.setItem(localStorageKey, JSON.stringify(value))
		})
		return () => subscription.unsubscribe()
	}, [methods])

	useEffect(() => {
		localStorage.setItem(stepStorageKey, currentStep.toString())
	}, [currentStep])

	const steps = [
		{ component: <PersonalData key='0' />, title: 'Личные данные' },
		{ component: <BioStep key='1' />, title: 'О себе' },
		{ component: <ProfessionalStep key='2' />, title: 'Профессиональное' },
		{ component: <MoreInfoStep key='3' />, title: 'Дополнительная информация' },
	]

	const stepFields: (keyof AnketFormType)[][] = [
		['name', 'birthDate'],
		['bio'],
		['job', 'skills', 'industries'],
		['languages', 'portfolio'],
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
			setIsFormSubmitting(true)
			const transformedData = {
				...data,
				skills: data.skills?.map((skill: any) =>
					typeof skill === 'object' ? skill.id : skill
				),
				portfolio: data.portfolio?.map(link => link.trim()),
			}
			await onSubmit(transformedData)
			localStorage.removeItem(localStorageKey)
			localStorage.removeItem(stepStorageKey)
		} catch (error) {
			console.error('Ошибка при отправке формы', error)
		} finally {
			setIsFormSubmitting(false)
		}
	}

	const handleCancel = () => {
		localStorage.removeItem(localStorageKey)
		localStorage.removeItem(stepStorageKey)
		if (onCancel) {
			onCancel()
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
				className='space-y-4 sm:space-y-3'
			>
				<div className='py-3 px-4 sm:py-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-0 gap-4 sm:gap-0'>
					<div className='flex flex-col'>
						<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white'>
							{mode === 'edit' ? 'Редактирование анкеты' : 'Создание анкеты'}
						</h2>
						<p className='text-sm text-gray-500 dark:text-neutral-500 mt-1'>
							Шаг {currentStep + 1} из {totalSteps}: {steps[currentStep].title}
						</p>
					</div>

					<div className='flex flex-col items-end w-full sm:w-32'>
						<span className='text-xs text-muted-foreground block mb-1'>
							Заполнено на {progress}%
						</span>
						<div className='w-full sm:w-28 bg-gray-200 dark:bg-neutral-800 rounded-full h-2'>
							<div
								className='bg-primary h-2 rounded-full transition-all duration-500'
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-center py-3 sm:py-4 border-t border-border rounded-tl-[15px] rounded-tr-[15px]'>
					<div className='flex space-x-2 sm:space-x-4'>
						{steps.map((step, index) => (
							<Tooltip key={index} text={step.title}>
								<button
									type='button'
									onClick={async () => {
										const isValid = await methods.trigger(
											stepFields[currentStep]
										)
										if (isValid || index <= currentStep) {
											setCurrentStep(index)
										}
									}}
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

				<div className='px-4 sm:px-6 pb-6 pt-3 sm:pt-4'>
					<div className='mb-6 sm:mb-8'>{steps[currentStep].component}</div>

					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2 pt-3 sm:pt-4 border-t border-border'>
						<div className='flex flex-col sm:flex-row gap-2'>
							{currentStep > 0 ? (
								<Button
									type='button'
									onClick={prevStep}
									variant='outline'
									className='h-11 w-full sm:w-auto gap-1 text-base sm:text-sm'
								>
									<ArrowLeft size={18} />
									Назад
								</Button>
							) : null}
							{mode === 'edit' && (
								<Button
									type='button'
									onClick={handleCancel}
									variant='outline'
									className='h-11 w-full sm:w-auto gap-1 text-base sm:text-sm'
								>
									Отменить изменения
								</Button>
							)}
						</div>

						{currentStep < totalSteps - 1 ? (
							<Button
								type='button'
								onClick={nextStep}
								className='h-11 w-full sm:w-auto gap-1 text-base sm:text-sm'
							>
								Далее
								<ArrowRight size={18} />
							</Button>
						) : (
							<Button
								type='button'
								onClick={confirm}
								disabled={isFormSubmitting}
								className='h-11 w-full sm:w-auto gap-1 text-base sm:text-sm'
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
