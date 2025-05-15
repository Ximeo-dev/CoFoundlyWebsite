'use client'

import { IProjectRequest } from '@/types/project.types'
import {
	ProjectFormSchema,
	ProjectFormType,
	ProjectFormValues,
} from '@/zod/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import MainDataStep from '../projects/components/steps/main-data-step'
import DescriptionStep from '../projects/components/steps/description-step'
import ProjectProfessionalStep from '../projects/components/steps/project-professional-step'
import { calculateProjectProgress } from '@/utils/calculateProjectProgress'
import ProgressBar from '@/components/ui/progress-bar/progress-bar'
import { cn } from '@/lib/utils'
import Tooltip from '@/components/ui/tooltip/tooltip'
import { Button } from '@/components/ui/shadcn/button'
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react'
import styles from './profile.module.css'
import ProjectAvatar from '@/components/ui/project-avatar/project-avatar'

interface IProjectForm {
	initialValues?: ProjectFormValues
	onSubmit: (data: IProjectRequest) => Promise<void>
	mode?: 'create' | 'edit'
	submitButtonText?: string
	onCancel?: () => void
	userId?: string | undefined
}

export default function ProjectForm({
	initialValues,
	onSubmit,
	mode = 'create',
	submitButtonText = mode === 'edit' ? 'Сохранить изменения' : 'Создать проект',
	onCancel,
	userId,
}: IProjectForm) {
	const localStorageKey = `projectFormData-${userId}`
	const stepStorageKey = `projectFormStep-${userId}`

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

	const methods = useForm<ProjectFormType>({
		defaultValues: {
			name: '',
			description: '',
			industry: '',
			skills: [],
			jobs: [],
			languages: [],
			...(savedData && mode !== 'edit' ? savedData : {}),
			...(initialValues && {
				name: initialValues.name,
				description: initialValues.description,
				industry:
					initialValues.industry && typeof initialValues.industry === 'object'
						? initialValues.industry.name
						: initialValues.industry || '',
				skills:
					initialValues.skills?.map((skill: any) =>
						typeof skill === 'object' ? skill.name : skill
					) || [],
				languages:
					initialValues.languages?.map((lang: any) =>
						typeof lang === 'object' ? lang.name : lang
					) || [],
				jobs:
					initialValues.jobs?.map((job: any) =>
						typeof job === 'object' ? job.name : job
					) || [],
			}),
		},
		resolver: zodResolver(ProjectFormSchema),
		mode: 'onChange',
	})

	const [currentStep, setCurrentStep] = useState(savedStep)
	const [isFormSubmitting, setIsFormSubmitting] = useState(false)
	const [avatarVersion, setAvatarVersion] = useState(Date.now())

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
		{ component: <MainDataStep key='0' />, title: 'Основная информация' },
		{ component: <DescriptionStep key='1' />, title: 'Описание проекта' },
		{
			component: <ProjectProfessionalStep key='2' />,
			title: 'Профессиональное',
		},
	]

	const stepFields: (keyof ProjectFormType)[][] = [
		['name', 'industry'], // Добавили industry для валидации
		['description'],
		['jobs', 'skills', 'languages'],
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

	const submitHandler = async (data: ProjectFormType) => {
		try {
			setIsFormSubmitting(true)
			const transformedData = {
				...data,
				skills: data.skills?.map((skill: any) =>
					typeof skill === 'object' ? skill.id : skill
				),
			}
			await onSubmit(transformedData)
			localStorage.removeItem(localStorageKey)
			localStorage.removeItem(stepStorageKey)
		} catch (error) {
			console.error('Submit error:', error)
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

	const progress = useMemo(() => {
		const values = methods.getValues()
		return calculateProjectProgress(values)
	}, [methods.watch()])

	const confirm = async () => {
		const fieldsToValidate = stepFields[currentStep]
		const isValid = await methods.trigger(fieldsToValidate)

		if (isValid) {
			methods.handleSubmit(submitHandler)()
		}
	}

	const projectName = methods.watch('name')

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				className={cn(
					styles.anket_form,
					'bg-background border border-border rounded-[15px]'
				)}
			>
				<div className={styles.form_top}>
					<div className={styles.form_block}>
						<div className='flex items-center gap-4'>
							<ProjectAvatar
								size={128}
								editable={mode === 'edit'}
								projectName={projectName || 'Новый проект'}
								avatarVersion={avatarVersion}
								setAvatarVersion={setAvatarVersion}
								className='shrink-0'
							/>
							<div>
								<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white'>
									{mode === 'edit'
										? 'Редактирование проекта'
										: 'Создание проекта'}
								</h2>
								<p className='text-sm text-gray-500 dark:text-neutral-500 mt-1'>
									Шаг {currentStep + 1} из {totalSteps}:{' '}
									{steps[currentStep].title}
								</p>
							</div>
						</div>
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
									className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ease-linear cursor-pointer ${
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
