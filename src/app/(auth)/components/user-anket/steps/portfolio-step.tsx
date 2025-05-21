'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/shadcn/input'
import { Button } from '@/components/ui/shadcn/button'

export default function PortfolioStep() {
	const { control, register } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'portfolio',
	})

	return (
		<div className='space-y-4'>
			{fields.map((field, index) => (
				<div key={field.id} className='flex items-center gap-2'>
					<Input
						{...register(`portfolio.${index}`)}
						placeholder='https://example.com'
						className='flex-1'
					/>
					<Button
						type='button'
						variant='destructive'
						onClick={() => remove(index)}
					>
						Удалить
					</Button>
				</div>
			))}

			<Button type='button' variant='outline' onClick={() => append('')}>
				Добавить ссылку
			</Button>
		</div>
	)
}
