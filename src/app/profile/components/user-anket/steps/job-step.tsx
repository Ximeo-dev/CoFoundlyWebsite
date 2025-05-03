import { useFormContext } from 'react-hook-form'

export default function JobStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div>
			<label className='block mb-2 font-semibold'>Род деятельности</label>
			<input
				{...register('job', { required: 'Обязательное поле' })}
				className='input'
				placeholder='Например: Frontend-разработчик'
			/>
			{/* {errors.job && (
				<p className='text-red-500 text-sm mt-1'>{errors.job.message}</p>
			)} */}
		</div>
	)
}
