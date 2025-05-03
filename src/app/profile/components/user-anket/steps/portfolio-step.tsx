import { useFormContext } from 'react-hook-form'

export default function PortfolioStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div>
			<label className='block mb-2 font-semibold'>
				Ссылка на портфолио или проект
			</label>
			<input
				{...register('portfolio.0', {
					required: 'Укажи хотя бы одну ссылку',
					pattern: {
						value: /^(https?):\/\/[^\s$.?#].[^\s]*$/,
						message: 'Некорректная ссылка',
					},
				})}
				className='input'
				placeholder='https://github.com/...'
			/>
			{/* {errors.portfolio?.[0] && (
				<p className='text-red-500 text-sm mt-1'>
					{errors.portfolio[0].message}
				</p>
			)} */}
		</div>
	)
}
