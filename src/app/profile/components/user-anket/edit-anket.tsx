'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { IAnketRequest } from '@/types/anket.types'
import { AnketFormData, AnketSchema } from '@/zod/anket.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquareArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { anketService } from '@/services/anket.service'
import Avatar from '../profile-info/avatar'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import SkillsModal from './steps/skills-modal'

export default function EditAnket({
	anket,
	onCancel,
	onUpdated,
}: {
	anket: any
	onCancel: () => void
	onUpdated: (updated: any) => void
}) {
	const { user } = useAuth()
	const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)

	const methods = useForm<any>({
		defaultValues: {
			job: anket?.job || '',
			bio: anket?.bio || '',
			skills: anket?.skills || [],
			portfolio: anket?.portfolio ? [anket.portfolio] : [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		resolver: zodResolver(AnketSchema),
		mode: 'onChange',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const skills = methods.watch('skills')

	const handleSubmit = async (data: IAnketRequest) => {
		setIsSubmitting(true)
		try {
			const response = await anketService.editAnket(data)
			toast.success('Анкета обновлена')
			onUpdated(response)
		} catch (e) {
			toast.error('Ошибка при обновлении анкеты')
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
					<h2 className='text-lg font-semibold'>Редактирование анкеты</h2>
				</div>

				<div className='flex'>
					<div className='w-1/2 flex flex-col px-10 border-r border-r-border pb-5'>
						<div className='flex flex-col items-center pt-5'>
							<Avatar size={512} editable />
							<div className='mt-7 w-full max-w-xs'>
								<h1 className='text-xl text-center'>{user?.name}</h1>
								<h1 className='text-xl text-center'>{user?.age}</h1>
							</div>
						</div>
					</div>

					<div className='pt-5 flex flex-col px-10 w-1/2'>
						<h2 className='text-xl'>Информация в анкете</h2>
						<div className='mt-8 space-y-8'>
							<div>
								<p className='text-gray-400'>Род деятельности</p>
								<Input
									{...methods.register('job')}
									placeholder='Род деятельности'
									className='text-lg mt-1'
								/>
							</div>

							<div>
								<p className='text-gray-400'>О себе</p>
								<Textarea
									{...methods.register('bio')}
									placeholder='Расскажите о себе'
									className='mt-1'
								/>
							</div>

							<div>
								<p className='text-gray-400'>Навыки</p>
								<div className='mt-1 flex flex-col gap-2'>
									<button
										type='button'
										onClick={() => setIsSkillsModalOpen(true)}
										className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition'
									>
										{skills.length > 0
											? skills.join(', ')
											: 'Выберите навыки...'}
									</button>
									{methods.formState.errors.skills && (
										<p className='text-sm text-red-500'>
											{methods.formState.errors.skills.message as string}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-end px-5 pb-10 mt-5'>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`px-6 py-3 rounded-full shadow transition ${
							isSubmitting
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-green-500 hover:bg-green-600 text-white'
						}`}
					>
						{isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
					</button>
				</div>

				<SkillsModal
					isOpen={isSkillsModalOpen}
					onClose={() => setIsSkillsModalOpen(false)}
				/>
			</form>
		</FormProvider>
	)
}
