'use client'

import { Input } from '@/components/ui/shadcn/input'
import { useFormContext } from 'react-hook-form'

export default function JobStep () {
	const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<label>Профессия</label>
			<Input {...register('job')} placeholder='Ваша профессия' />
		</div>
	)
}
