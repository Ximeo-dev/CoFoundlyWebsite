'use client'

import { Input } from '@/components/ui/shadcn/input'
import { useFormContext } from 'react-hook-form'

export const LanguagesStep = () => {
	const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<label>Языки</label>
			<Input
				{...register('languages')}
				placeholder='Укажите языки через запятую'
			/>
		</div>
	)
}
