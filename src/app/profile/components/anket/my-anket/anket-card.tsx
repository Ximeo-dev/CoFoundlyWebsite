import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface AnketCardProps {
	avatarUrl?: string
	name: string
	age: number
	job: string
	skills: string[]
	bio: string
}

export default function AnketCard({
	avatarUrl,
	name,
	age,
	job,
	skills,
	bio,
}: AnketCardProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedName, setEditedName] = useState(name)
	const [editedAge, setEditedAge] = useState(age)
	const [editedJob, setEditedJob] = useState(job)
	const [editedBio, setEditedBio] = useState(bio)

	const handleEditClick = () => {
		setIsEditing(true)
	}

	const handleCancelEdit = () => {
		setIsEditing(false)
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedName(e.target.value)
	}

	const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedAge(Number(e.target.value))
	}

	const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedJob(e.target.value)
	}

	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedBio(e.target.value)
	}

	return (
		<AnimatePresence mode='wait'>
			<div className='relative'>
				<motion.div
					className='bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] shadow-lg rounded-[15px] p-6 flex flex-col w-[400px]'
					initial={{ x: 0 }}
					animate={{ x: isEditing ? 450 : 0 }}
					exit={{ x: 450 }}
					transition={{
						x: {
							type: 'spring',
							stiffness: 300,
							damping: 30,
							duration: 1.5,
							ease: 'easeInOut',
						},
					}}
				>
					<div className='flex items-center justify-center'>
						<div className='w-36 h-36 rounded-full bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] mb-10 flex justify-center items-center'>
							{avatarUrl && (
								<Image
									src={avatarUrl}
									alt='Аватар'
									width={120}
									height={120}
									className='rounded-full object-cover w-full'
								/>
							)}
						</div>
					</div>

					<h2 className='text-2xl font-bold mb-1 text-center'>
						{editedName}, {editedAge}
					</h2>
					<p className='text-sm text-gray-500 dark:text-gray-400 mb-8 text-center'>
						{editedJob}
					</p>

					<div className='flex flex-wrap gap-3 justify-center mb-10'>
						{skills.map((skill, index) => (
							<span
								key={index}
								className='bg-black text-white dark:bg-white dark:text-black text-sm font-medium px-3 py-1 rounded-[15px]'
							>
								{skill}
							</span>
						))}
					</div>

					<span className='mb-2'>О себе:</span>
					<p className='text-gray-700 dark:text-gray-300 text-sm'>
						{editedBio}
					</p>
				</motion.div>

				<div className='flex items-center justify-center mt-8'>
					<button
						onClick={isEditing ? handleCancelEdit : handleEditClick}
						className={`mt-4 rounded-[15px] px-4 py-2 cursor-pointer ${
							isEditing
								? 'bg-red-400 text-white'
								: 'bg-black text-white dark:bg-white dark:text-black'
						}`}
					>
						{isEditing ? 'Отмена' : 'Редактировать'}
					</button>
				</div>

				{isEditing && (
					<motion.div
						className='absolute top-0 left-0 bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] shadow-lg rounded-[15px] p-6 w-[400px] z-10'
						initial={{ x: 0 }}
						animate={{ x: -450 }}
						exit={{ x: 0 }}
						transition={{
							x: {
								type: 'spring',
								stiffness: 300,
								damping: 30,
								duration: 1.5,
								ease: 'easeInOut',
							},
						}}
					>
						<h3 className='text-2xl font-bold mb-6 text-center'>
							Редактирование профиля
						</h3>
						<form>
							<div className='mb-4'>
								<label htmlFor='name' className='block mb-2'>
									Имя
								</label>
								<input
									type='text'
									id='name'
									className='border border-[#d9d7d7] dark:border-[#3a3a3a] p-2 rounded-xl w-full bg-transparent outline-none'
									value={editedName}
									onChange={handleNameChange}
								/>
							</div>

							<div className='mb-4'>
								<label htmlFor='age' className='block mb-2'>
									Возраст
								</label>
								<input
									type='number'
									id='age'
									className='border border-[#d9d7d7] dark:border-[#3a3a3a] p-2 rounded-xl w-full bg-transparent outline-none'
									value={editedAge}
									onChange={handleAgeChange}
								/>
							</div>

							<div className='mb-4'>
								<label htmlFor='job' className='block mb-2'>
									Должность
								</label>
								<input
									type='text'
									id='job'
									className='border border-[#d9d7d7] dark:border-[#3a3a3a] p-2 rounded-xl w-full bg-transparent outline-none'
									value={editedJob}
									onChange={handleJobChange}
								/>
							</div>

							<div className='mb-4'>
								<label htmlFor='bio' className='block mb-2'>
									О себе
								</label>
								<textarea
									id='bio'
									className='border border-[#d9d7d7] dark:border-[#3a3a3a] p-2 rounded-xl w-full bg-transparent outline-none'
									value={editedBio}
									onChange={handleBioChange}
                  maxLength={100}
								/>
							</div>

							<div className='flex justify-center mt-4'>
								<button
									type='submit'
									className='bg-black text-white dark:bg-white dark:text-black rounded-[15px] px-4 py-2 mt-2 transition-all duration-300 cursor-pointer'
								>
									Сохранить
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</div>
		</AnimatePresence>
	)
}
