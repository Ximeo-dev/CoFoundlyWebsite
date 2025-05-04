'use client'

import AnketView from '@/app/profile/components/user-anket/anket-view'
import { anketService } from '@/services/anket.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function UsersSwipe() {
	const [isEditing, setIsEditing] = useState(false)

	const { data: anket } = useQuery({
		queryKey: ['anket'],
		queryFn: () => anketService.getAnket()
	})

	return <AnketView anket={anket} onEdit={() => setIsEditing(false)} />
}