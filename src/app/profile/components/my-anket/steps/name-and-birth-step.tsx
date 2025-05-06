'use client'

import { Input } from '@/components/ui/shadcn/input'
import { useFormContext } from 'react-hook-form'

export default function NameAndBirthStep() {
  const { register } = useFormContext()

	return (
		<div className='space-y-4'>
			<div>
				<label>Имя</label>
				<Input {...register('name')} placeholder='Ваше имя' />
			</div>
			<div>
				<label>Дата рождения</label>
				<Input type='date' {...register('birthDate')} />
			</div>
		</div>
	)
}