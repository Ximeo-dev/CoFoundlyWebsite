'use client'

import { useAnketQuery } from '@/hooks/anket/useAnket'
import AnketFill from './anket-fill/anket-fill'

export default function AnketPage() {
	const { data, isLoading } = useAnketQuery()

	if (isLoading) return <div>Загрузка...</div>

	const isEdit = !!data

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>
				{isEdit ? 'Редактирование анкеты' : 'Создание анкеты'}
			</h1>
			<AnketFill isEdit={isEdit} initialData={data ?? undefined} />
		</div>
	)
}