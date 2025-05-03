import { useFormContext } from 'react-hook-form'

export default function BioStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div>
			<label className='block mb-2 font-semibold'>О себе</label>
			<textarea
				{...register('bio', { required: 'Обязательное поле' })}
				className='input h-32'
				placeholder='Кратко опиши себя, опыт, цели...'
			/>
			{/* {errors.bio && (
				<p className='text-red-500 text-sm mt-1'>{errors.bio.message}</p>
			)} */}
		</div>
	)
}
