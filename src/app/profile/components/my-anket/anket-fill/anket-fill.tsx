'use client'

import { useAnketMutation } from '@/hooks/anket/useAnketMutation'
import { IAnketRequest } from '@/types/anket.types'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import NameAndBirthStep from '../steps/name-and-birth-step'
import BioStep from '../steps/bio-step'
import JobStep from '../steps/job-step'
import SkillsStep from '../steps/skills-step'
import { LanguagesStep } from '../steps/languages-step'
import { PortfolioStep } from '../steps/portfolio-step'

const steps = [
	{ id: 1, label: 'Имя и дата рождения', component: NameAndBirthStep },
	{ id: 2, label: 'О себе', component: BioStep },
	{ id: 3, label: 'Профессия', component: JobStep },
	{ id: 4, label: 'Навыки', component: SkillsStep },
	{ id: 5, label: 'Языки', component: LanguagesStep },
	{ id: 6, label: 'Портфолио', component: PortfolioStep },
]

export default function AnketFill({
	isEdit,
	initialData,
}: {
	isEdit: boolean
	initialData?: IAnketRequest
}) {
  const methods = useForm<IAnketRequest>({ defaultValues: initialData })
  const [stepIndex, setStepIndex] = useState(0)
  const { mutateAsync, isPending } = useAnketMutation(isEdit)

  const StepComponent = steps[stepIndex].component

  const nextStep = () => setStepIndex(i => Math.min(i + 1, steps.length - 1))
  const prevStep = () => setStepIndex(i => Math.max(i - 1, 0))

  const onSubmit = async (data: IAnketRequest) => {
    await mutateAsync(data)
  }

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='flex items-center gap-4'>
					{steps.map((step, idx) => (
						<div
							key={step.id}
							className={`w-8 h-8 rounded-full text-sm flex items-center justify-center ${
								idx === stepIndex ? 'bg-blue-500 text-white' : 'bg-gray-300'
							}`}
							title={step.label}
						>
							{step.id}
						</div>
					))}
				</div>
				<StepComponent />
				<div className='flex justify-between'>
					{stepIndex > 0 && (
						<button type='button' onClick={prevStep} className='btn'>
							Назад
						</button>
					)}
					{stepIndex < steps.length - 1 ? (
						<button type='button' onClick={nextStep} className='btn'>
							Далее
						</button>
					) : (
						<button
							type='submit'
							disabled={isPending}
							className='btn btn-primary'
						>
							{isEdit ? 'Сохранить' : 'Создать'}
						</button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}