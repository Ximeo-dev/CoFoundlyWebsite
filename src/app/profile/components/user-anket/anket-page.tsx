'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { anketService } from '@/services/anket.service'
import { useState } from 'react'
import AnketView from './anket-view/anket-view'
import EditAnket from './edit-anket/edit-anket'
import CreateAnket from './create-anket/create-anket'

export default function AnketPage() {
	const queryClient = useQueryClient()
	const { data: anket, isLoading } = useQuery({
		queryKey: ['anket'],
		queryFn: () => anketService.getAnket(),
	})

	const [isEditing, setIsEditing] = useState(false)
	const [isCreating, setIsCreating] = useState(false)

	if (isLoading) return <p>Загрузка...</p>

	if (anket) {
		if (isEditing) {
			return (
				<EditAnket
					anket={anket}
					onCancel={() => setIsEditing(false)}
					onUpdated={updatedAnket => {
						queryClient.setQueryData(['anket'], updatedAnket)
						setIsEditing(false)
					}}
				/>
			)
		}
		return <AnketView editable anket={anket} onEdit={() => setIsEditing(true)} />
	}

	return (
		<CreateAnket
			onCreated={createdAnket => {
				queryClient.setQueryData(['anket'], createdAnket)
				setIsCreating(false)
			}}
		/>
	)
}
