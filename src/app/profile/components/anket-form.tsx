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
import { calculateProgress } from '@/utils/calculateProgress'
import styles from './profile.module.css'
import { cn } from '@/lib/utils'
import ProgressBar from '@/components/ui/progress-bar/progress-bar'

interface IAnketForm {
	initialValues?: AnketFormValues
	onSubmit: (data: IAnketRequest) => Promise<void>
	mode?: 'create' | 'edit'
	submitButtonText?: string
	onCancel?: () => void
	userId?: string | undefined
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

	const totalSteps = steps.length

	const progress = useMemo(() => {
		const values = methods.getValues()
		return calculateProgress(values)
	}, [methods.watch()])

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
				className={styles.anket_form}
			>
				<div className={styles.form_top}>
					<div className={styles.form_block}>
						<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white'>
							{mode === 'edit' ? 'Редактирование анкеты' : 'Создание анкеты'}
						</h2>
						<p className='text-sm text-gray-500 dark:text-neutral-500 mt-1'>
							Шаг {currentStep + 1} из {totalSteps}: {steps[currentStep].title}
						</p>
					</div>

					<ProgressBar progress={progress} />
				</div>

				<div className={cn(styles.steps, 'border-t border-border')}>
					<div className={styles.steps_block}>
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

				<div className={styles.content_block}>
					<div className={styles.content_inner}>
						{steps[currentStep].component}
					</div>

					<div className={cn(styles.step_buttons, 'border-t border-border')}>
						<div className={styles.buttons_block}>
							{currentStep > 0 ? (
								<Button
									type='button'
									onClick={prevStep}
									variant='outline'
									className={styles.actions_btn}
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
									className={styles.actions_btn}
								>
									Отменить изменения
								</Button>
							)}
						</div>

						{currentStep < totalSteps - 1 ? (
							<Button
								type='button'
								onClick={nextStep}
								className={styles.actions_btn}
							>
								Далее
								<ArrowRight size={18} />
							</Button>
						) : (
							<Button
								type='button'
								onClick={confirm}
								disabled={isFormSubmitting}
								className={styles.actions_btn}
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
