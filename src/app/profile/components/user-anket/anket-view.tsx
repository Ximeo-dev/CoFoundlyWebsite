import { IAnket } from '@/types/anket.types'

export default function AnketView({
	anket,
	onEdit,
}: {
	anket: any
	onEdit: () => void
}) {
	return (
		<div className='p-6 border rounded-xl shadow bg-white'>
			<h2 className='text-xl font-bold mb-4'>Твоя анкета</h2>
			<p>
				<strong>Имя:</strong> {anket.name}
			</p>
			<p>
				<strong>Возраст:</strong> {anket.age}
			</p>
			<p>
				<strong>Род деятельности:</strong> {anket.job}
			</p>
			<p>
				<strong>О себе:</strong> {anket.bio}
			</p>
			<p>
				<strong>Навыки:</strong> {anket.skills?.join(', ')}
			</p>
			<p>
				<strong>Портфолио:</strong> {anket.portfolio}
			</p>

			<button onClick={onEdit} className='mt-4 btn'>
				Редактировать
			</button>
		</div>
	)
}
