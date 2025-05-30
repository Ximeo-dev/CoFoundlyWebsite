'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import AnketView from './anket-view/anket-view'
import AnketEditor from './anket-editor'
import SkeletonView from './anket-view/skeleton-view'
import { useProfile } from '@/hooks/anket/useProfile'

export default function AnketPage() {
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)
	const { anket, isLoading } = useProfile()

	if (isLoading) return <SkeletonView />

	if (anket) {
		return isEditing ? (
			<AnketEditor
				onCancel={() => setIsEditing(false)}
				mode='edit'
				initialData={anket}
				onSuccess={updatedAnket => {
					queryClient.setQueryData(['anket'], updatedAnket)
					setIsEditing(false)
				}}
			/>
		) : (
			<AnketView showProgress editable onEdit={() => setIsEditing(true)} anket={anket} />
		)
	}

	return (
		<AnketEditor
			mode='create'
			onSuccess={createdAnket => {
				queryClient.setQueryData(['anket'], createdAnket)
				setIsEditing(false)
			}}
		/>
	)
}
