'use client'

import { IAnketRequest, IAnket } from '@/types/anket.types'
import { toast } from 'sonner'
import { anketService } from '@/services/anket.service'
import AnketForm from '../../anket-form'

interface EditAnketProps {
	initialData: IAnketRequest
	onUpdated: (updated: IAnket) => void
}

export default function EditAnket({ initialData, onUpdated }: EditAnketProps) {
	const handleSubmit = async (data: IAnketRequest) => {
		try {
			const response = await anketService.editAnket(data)
			toast.success('Анкета успешно обновлена')
			onUpdated(response)
		} catch (error) {
			console.error('Ошибка при обновлении анкеты:', error)
			toast.error('Не удалось обновить анкету')
		}
	}

	return (
		<AnketForm
			initialValues={initialData}
			onSubmit={handleSubmit}
			isEdit
			submitButtonText='Сохранить изменения'
		/>
	)
}
