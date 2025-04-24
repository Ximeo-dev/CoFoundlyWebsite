'use client'

import { useProfileData } from '@/hooks/useProfileData'
import maskEmail from '@/utils/maskEmail'

export default function SettingsProfile() {
  const { userProfile } = useProfileData()

  return (
		<div className='flex flex-col'>
			<div className='bg-white dark:bg-[#151515] rounded-full w-32 h-32 border border-[#d9d7d7] dark:border-[#3a3a3a] mb-10' />
			<div className='flex flex-col gap-y-1'>
				<h1 className='text-xl'>{userProfile?.name}</h1>
				<h2 className='text-[#696363] dark:text-[#929191] text-sm'>
					{userProfile?.email && maskEmail(userProfile.email)}
				</h2>
			</div>
			<div className='mt-20 max-w-[600px]'>
				<h1 className='text-2xl mb-8'>Личные данные</h1>
				<div className='flex justify-between items-center py-6 border-b border-[#d9d7d7] dark:border-[#3a3a3a] w-full'>
					<div>
						<h1 className='text-xl'>Имя</h1>
						<h2 className='text-[#696363] dark:text-[#929191] text-sm'>
							{userProfile?.name}
						</h2>
					</div>
					<button className='px-2.5 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-[15px]'>
						Поменять
					</button>
				</div>
				<div className='flex justify-between items-center py-6 border-b border-[#d9d7d7] dark:border-[#3a3a3a] w-full'>
					<div>
						<h1 className='text-xl'>Электронная почта</h1>
						<h2 className='text-[#696363] dark:text-[#929191] text-sm'>
							{userProfile?.email && maskEmail(userProfile.email)}
						</h2>
					</div>
					<button className='px-2.5 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-[15px]'>
						Поменять
					</button>
				</div>
				<div className='flex justify-between items-center py-6'>
					<div>
						<h1 className='text-xl'>Пароль</h1>
					</div>
					<button className='px-2.5 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-[15px]'>
						Поменять
					</button>
				</div>
			</div>
		</div>
	)
}