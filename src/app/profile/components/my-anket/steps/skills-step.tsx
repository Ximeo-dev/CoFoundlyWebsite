'use client'

import { Textarea } from '@/components/ui/shadcn/textarea'
import { useFormContext } from 'react-hook-form'

export default function SkillsStep () {
	const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<label>Навыки</label>
			<Textarea
				{...register('skills')}
				placeholder='Опишите ваши ключевые навыки'
				rows={3}
			/>
		</div>
	)
}
