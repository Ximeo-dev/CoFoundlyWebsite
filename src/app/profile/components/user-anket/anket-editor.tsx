'use client'

import { anketService } from '@/services/anket.service'
import { IAnketRequest, IAnket } from '@/types/anket.types'
import { toast } from 'sonner'
import AnketForm from '../anket-form'
import { useAuth } from '@/hooks/useAuth'

type AnketEditorMode = 'create' | 'edit'

interface IAnketEditor {
	mode?: AnketEditorMode
	initialData?: IAnketRequest
	onSuccess: (data: IAnket) => void
	onCancel?: () => void
}

export default function AnketEditor({
	mode = 'create',
	initialData,
	onSuccess,
	onCancel
}: IAnketEditor) {
	const { user } = useAuth()

	const handleSubmit = async (data: IAnketRequest) => {
		try {
			let response: IAnket

			if (mode === 'edit') {
				response = await anketService.editAnket(data)
				toast.success('Анкета успешно обновлена')
			} else {
				response = await anketService.createAnket(data)
				toast.success('Анкета успешно создана')
			}

			onSuccess(response)
		} catch (error) {
			console.error(
				`Ошибка при ${mode === 'edit' ? 'обновлении' : 'создании'} анкеты:`,
				error
			)
			toast.error(
				`Не удалось ${mode === 'edit' ? 'обновить' : 'создать'} анкету`
			)
		}
	}

	return (
		<AnketForm
			initialValues={initialData}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			mode={mode}
			submitButtonText={
				mode === 'edit' ? 'Сохранить изменения' : 'Создать анкету'
			}
		/>
	)
}
