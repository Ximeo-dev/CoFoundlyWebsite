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

export default function EditAnket({
	anket,
	onCancel,
	onUpdated,
}: {
	anket: any
	onCancel: () => void
	onUpdated: (updated: any) => void
}) {
	const methods = useForm<AnketFormData>({
		defaultValues: {
			name: anket?.name || '',
			age: anket?.age || '',
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
							<Avatar size={512} />
							<div className='mt-7 w-full max-w-xs'>
								<Input
									{...methods.register('name')}
									placeholder='Имя'
									className='text-xl text-center'
								/>
								<Input
									{...methods.register('age')}
									placeholder='Возраст'
									className='text-xl text-center mt-2'
								/>
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
								<Input
									{...methods.register('skills')}
									placeholder='Навыки (через запятую)'
									className='mt-1'
								/>
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
			</form>
		</FormProvider>
	)
}
