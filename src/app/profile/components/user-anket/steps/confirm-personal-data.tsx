'use client'

import { useFormContext } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

export default function ConfirmPersonalData() {
	const { user } = useAuth()

	return (
		<div className='space-y-4'>
			<div>
				<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
					Проверьте ваши данные
				</h3>
				<p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
					Имя и возраст можно изменить в профиле
				</p>
			</div>

			<div className='space-y-4'>
				<div className='border-b border-border pb-4'>
					<p className='text-sm font-medium text-gray-500 dark:text-neutral-500'>
						Имя
					</p>
					<p className='mt-1 text-lg text-gray-900 dark:text-gray-100'>
						{user?.name || 'Не указано'}
					</p>
				</div>

				<div className=''>
					<p className='text-sm font-medium text-gray-500 dark:text-neutral-500'>
						Возраст
					</p>
					<p className='mt-1 text-lg text-gray-900 dark:text-gray-100'>
						{user?.age ? `${user.age} лет` : 20}
					</p>
				</div>
			</div>
		</div>
	)
}
