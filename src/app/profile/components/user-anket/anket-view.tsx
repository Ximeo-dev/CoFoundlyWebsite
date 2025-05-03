'use client'

import { Pencil } from 'lucide-react'
import Avatar from '../profile-info/avatar'

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
		<div className=''>
			<div className='border-b border-border py-3'>
				<div className='flex justify-between w-full items-center px-5'>
					<h2 className='text-lg'>Ваша анкета</h2>
					<div className='flex flex-col items-center'>
						<p className='text-sm text-gray-400'>Заполнено на {progress}%</p>
						<div className='w-[200px] bg-gray-700 rounded-full h-2'>
							<div
								className='bg-pink-100 h-2 rounded-full transition-all'
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
					<button onClick={onEdit} className='text-sm cursor-pointer'>
						<Pencil className='text-[#656565] hover:text-[#828282] transition-colors duration-300 w-5 h-5' />
					</button>
				</div>
			</div>

			<div className='flex'>
				<div className='w-1/2 flex flex-col px-10 border-r border-r-border pb-5'>
					<div className='flex flex-col items-center pt-5'>
						<Avatar size={512} />
						<h1 className='text-xl mt-7'>
							{anket.name}, {anket.age}
						</h1>
					</div>
				</div>

				<div className='pt-5 flex flex-col px-10'>
					<h2 className='text-xl'>Информация в анкете</h2>
					<div className='mt-8 space-y-8'>
						<div className=''>
							<p className='text-gray-400'>Род деятельности</p>
							<p className='text-lg'>{anket.job}</p>
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
					</div>
				</div>
			</div>
		</div>
	)
}
