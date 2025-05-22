'use client'

import { anketService } from '@/services/anket.service'
import { IAnketRequest } from '@/types/anket.types'
import { toast } from 'sonner'
import AnketForm from '../../anket-form'

export default function CreateAnket({
	onCreated,
}: {
	onCreated: (created: any) => void
}) {

	const handleSubmit = async (data: IAnketRequest, avatarFile?: File | null) => {
    console.log('handleSubmit called with', data)
    try {
      const response = await anketService.createAnket(data)
      if (avatarFile) {
				await anketService.uploadAvatar(avatarFile)
			}
      toast.success('Анкета успешно создана')
      onCreated(response)
    } catch {
      toast.error('Ошибка при создании анкеты')
    }
  }

	return <AnketForm onSubmit={handleSubmit} />
}
