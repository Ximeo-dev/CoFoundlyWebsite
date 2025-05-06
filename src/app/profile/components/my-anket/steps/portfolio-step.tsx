'use client'

import { Textarea } from '@/components/ui/shadcn/textarea'
import { useFormContext } from 'react-hook-form'

export const PortfolioStep = () => {
	const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<label>Портфолио</label>
			<Textarea
				{...register('portfolio')}
				placeholder='Ссылки или описание проектов'
				rows={3}
			/>
		</div>
	)
}
