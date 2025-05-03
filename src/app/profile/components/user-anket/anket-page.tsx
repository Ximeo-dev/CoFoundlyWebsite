'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { useState } from 'react'
import CreateAnket from './create-anket'
import AnketView from './anket-view'

export default function AnketPage() {
	const queryClient = useQueryClient()
	const { data: anket, isLoading } = useQuery({
		queryKey: ['anket'],
		queryFn: () => anketService.getAnket(),
	})

	const [isEditing, setIsEditing] = useState(false)

	if (isLoading) return <p>Загрузка...</p>

	if (anket && !isEditing) {
		return <AnketView anket={anket} onEdit={() => setIsEditing(true)} />
	}

	return (
		<CreateAnket
			existingAnket={anket}
			onCreated={(updatedAnket) => {
				queryClient.setQueryData(['anket'], updatedAnket)
				setIsEditing(false)
			}}
		/>
	)
}
