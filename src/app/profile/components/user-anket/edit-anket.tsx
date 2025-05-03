'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { anketService } from '@/services/anket.service'
import { AnketFormData, AnketSchema } from '@/zod/anket.schema'
import Avatar from '../profile-info/avatar'
import { SquareArrowLeft } from 'lucide-react'

export default function EditAnket({
	existingAnket,
	onCancel,
	onSaved,
}: {
	existingAnket: AnketFormData
	onCancel: () => void
	onSaved: (updated: any) => void
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AnketFormData>({
		defaultValues: existingAnket,
		resolver: zodResolver(AnketSchema),
	})

	const onSubmit = async (data: AnketFormData) => {
		try {
			const updated = await anketService.editAnket(data)
			toast.success('Анкета обновлена')
			onSaved(updated)
		} catch {
			toast.error('Ошибка при обновлении анкеты')
		}
	}

	return (
		<div>
			<div className='border-b border-border py-3'>
				<div className='flex justify-between w-full items-center px-5'>
					<button onClick={onCancel} className='text-sm cursor-pointer'>
						<SquareArrowLeft className='text-[#656565] hover:text-[#828282] transition-colors duration-300 w-5 h-5' />
					</button>
					<h2 className='text-lg'>Редактирование</h2>
				</div>
			</div>

			<div className='flex'>
				<div className='w-1/2 flex flex-col px-10 border-r border-r-border pb-5 justify-center'>
					<div className='flex flex-col items-center pt-5'>
						<Avatar editable size={512} />
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6 px-5 py-6'>
					<div>
						<label className='block text-sm'>Имя</label>
						<input value={existingAnket.name} disabled className='input opacity-50' />
					</div>

					<div>
						<label className='block text-sm'>Возраст</label>
						<input value={existingAnket.age} disabled className='input opacity-50' />
					</div>

					<div>
						<label className='block text-sm'>Род деятельности</label>
						<input {...register('job')} className='input' />
					</div>

					<div>
						<label className='block text-sm'>О себе</label>
						<textarea {...register('bio')} className='input' rows={4} />
					</div>

					<div>
						<label className='block text-sm'>Навыки</label>
						<input
							{...register('skills')}
							className='input'
							placeholder='React, Node.js, Figma'
						/>
					</div>

					<div>
						<label className='block text-sm'>Портфолио (ссылка)</label>
						<input {...register('portfolio.0')} className='input' />
					</div>

					<div className='flex justify-end gap-4'>
						<button type='button' onClick={onCancel} className='text-gray-600'>
							Отмена
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='bg-blue-600 text-white px-6 py-2 rounded'
						>
							{isSubmitting ? 'Сохранение...' : 'Сохранить'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
