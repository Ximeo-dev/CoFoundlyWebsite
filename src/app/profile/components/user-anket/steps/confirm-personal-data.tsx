import { useFormContext } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

export default function ConfirmPersonalData() {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const { user } = useAuth()

	return (
		<div>
			<label className='block mb-2 font-semibold'>Имя</label>
			<input
				{...register('name')}
				defaultValue={user?.name || ''}
				className='input'
				placeholder='Введите имя'
			/>
			{errors.name && (
				<p className='text-red-500 text-sm mt-1'>
					{errors.name.message as string}
				</p>
			)}

			<label className='block mt-4 mb-2 font-semibold'>Возраст</label>
			<input
				type='number'
				{...register('age', { valueAsNumber: true })}
				defaultValue={user?.age || ''}
				className='input'
				placeholder='Введите возраст'
			/>
			{errors.age && (
				<p className='text-red-500 text-sm mt-1'>
					{errors.age.message as string}
				</p>
			)}
		</div>
	)
}
