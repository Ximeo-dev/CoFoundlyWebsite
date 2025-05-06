'use client'

import { Textarea } from '@/components/ui/shadcn/textarea'
import { useFormContext } from 'react-hook-form'

export default function BioStep () {
	const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<label>О себе</label>
			<Textarea
				{...register('bio')}
				placeholder='Напишите немного о себе'
				rows={4}
			/>
		</div>
	)
}
