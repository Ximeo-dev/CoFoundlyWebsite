'use client'

import { Pencil } from 'lucide-react'
import Avatar from '../profile-info/avatar'
import { useAuth } from '@/hooks/useAuth'

export default function AnketView({
	anket,
	onEdit,
	editable = false
}: {
	anket: any
	onEdit?: () => void
	editable?: boolean
}) {
	const { user } = useAuth()

	const filledFields = [
		anket?.bio,
		anket?.skills?.length,
		anket?.portfolio?.length,
	]

	const filledCount = filledFields.filter(Boolean).length
	const totalCount = filledFields.length
	const progress = Math.round((filledCount / totalCount) * 100)

	return (
		<div className=''>
			<div className='border-b border-border py-5'>
				<div className='flex justify-between w-full items-center px-5'>
					<h2 className='text-lg'>{editable ? 'Ваша анкета' : 'Анкета'}</h2>
					<div className='flex flex-col items-center w-44'>
						<span className='text-xs text-gray-500 dark:text-neutral-500 mb-1'>
							Заполнено на {Math.round(progress)}%
						</span>
						<div className='w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2'>
							<div
								className='bg-cyan-300 dark:bg-pink-200 h-2 rounded-full transition-all duration-500'
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
					{editable && ( 
						<button onClick={onEdit} className='text-sm cursor-pointer'>
							<Pencil className='text-[#656565] hover:text-[#828282] transition-colors duration-300 w-5 h-5' />
						</button>
					)}
				</div>
			</div>

			<div className='flex'>
				<div className='w-1/2 flex flex-col px-10 border-r border-r-border'>
					<div className='flex flex-col items-center pt-5'>
						<Avatar size={512} editable={editable} />
						<h1 className='text-xl mt-7'>
							{user?.name}, {user?.age}
						</h1>
					</div>
				</div>

				<div className='pt-5 flex flex-col px-10 pb-5'>
					<h2 className='text-xl'>Информация в анкете</h2>
					<div className='mt-8 space-y-8'>
						<div className=''>
							<p className='text-gray-400'>Род деятельности</p>
							<p className='text-lg'>{anket?.job}</p>
						</div>

						<div>
							<p className='text-gray-400'>О себе</p>
							<p>{anket?.bio || 'Нет описания'}</p>
						</div>

						<div>
							<p className='text-gray-400'>Навыки</p>
							{anket?.skills?.length ? (
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
						{editable && (
							<button
								className='px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 dark:bg-[#EDEDED] dark:text-black dark:hover:bg-white/80 transition-colors duration-300 flex items-center cursor-pointer'
								onClick={onEdit}
							>
								Редактировать
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
