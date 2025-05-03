'use client'

import { useQuery } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { useState } from 'react'
import CreateAnket from './create-anket'
import AnketView from './anket-view'

export default function AnketPage() {
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
		<CreateAnket existingAnket={anket} onCreated={() => setIsEditing(false)} />
	)
}
