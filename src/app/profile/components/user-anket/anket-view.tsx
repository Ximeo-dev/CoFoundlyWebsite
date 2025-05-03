import { IAnket } from '@/types/anket.types'

export default function AnketView({
	anket,
	onEdit,
}: {
	anket: any
	onEdit: () => void
}) {
	const filledFields = [
		anket.name,
		anket.age,
		anket.bio,
		anket.skills?.length,
		anket.portfolio?.length,
	]

	const filledCount = filledFields.filter(Boolean).length
	const totalCount = filledFields.length
	const progress = Math.round((filledCount / totalCount) * 100)

	return (
		<div className='max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-bold'>Ваша анкета</h2>
				<button
					onClick={onEdit}
					className='text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition'
				>
					Редактировать
				</button>
			</div>

			<div className='mb-6'>
				<p className='text-sm text-gray-400 mb-1'>Заполнено на {progress}%</p>
				<div className='w-full bg-gray-700 rounded-full h-2'>
					<div
						className='bg-green-500 h-2 rounded-full transition-all'
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<div className='space-y-4'>
				<div>
					<p className='text-gray-400'>Имя и возраст</p>
					<p className='text-lg'>
						{anket.name}, {anket.age}
					</p>
				</div>

				<div>
					<p className='text-gray-400'>О себе</p>
					<p>{anket.bio || 'Нет описания'}</p>
				</div>

				<div>
					<p className='text-gray-400'>Навыки</p>
					{anket.skills?.length ? (
						<div className='flex flex-wrap gap-2 mt-1'>
							{anket.skills.map((skill: any) => (
								<span
									key={skill}
									className='bg-gray-700 text-sm px-3 py-1 rounded-full'
								>
									{skill}
								</span>
							))}
						</div>
					) : (
						<p>Нет навыков</p>
					)}
				</div>

				{/* <div>
					<p className='text-gray-400'>Портфолио</p>
					{anket.portfolio?.length ? (
						<ul className='list-disc list-inside'>
							{anket.portfolio.map((item: any, index: number) => (
								<li key={index} className='text-blue-400'>
									{item}
								</li>
							))}
						</ul>
					) : (
						<p>Нет ссылок</p>
					)}
				</div> */}
			</div>
		</div>
	)
}
