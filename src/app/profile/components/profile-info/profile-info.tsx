'use client'

import { useProfileData } from '@/hooks/useProfileData'
import maskEmail from '@/utils/maskEmail'
import ResetPassword from './reset-password'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'

export default function ProfileInfo() {
	const { userProfile } = useProfileData()

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='flex flex-col items-center mb-10'>
				<div className='w-32 h-32 rounded-full border border-[#d9d7d7] dark:border-[#3a3a3a] bg-white dark:bg-[#151515]' />
				<div className='mt-4 text-center'>
					<TextAnimate
						className='text-xl font-semibold'
						animation='slideUp'
						by='character'
						duration={0.2}
					>
						{userProfile?.name || ''}
					</TextAnimate>
					<TextAnimate
						animation='slideUp'
						by='character'
						duration={0.2}
						className='text-[#696363] dark:text-[#929191] text-sm'
					>
						{(userProfile?.email && maskEmail(userProfile.email)) || ''}
					</TextAnimate>
				</div>
			</div>

			<TextAnimate
				animation='slideUp'
				by='character'
				duration={0.2}
				className='text-2xl font-semibold mt-8 mb-12 text-start'
			>
				Личные данные
			</TextAnimate>

			<div className='md:lg-[350px] lg:w-[400px] xl:w-[600px] mb-6'>
				<div className='space-y-8'>
					<div className='flex justify-between items-center border-b border-[#d9d7d7] dark:border-[#3a3a3a] pb-6'>
						<div>
							<TextAnimate
								animation='slideUp'
								className='text-xl font-medium'
								by='character'
								duration={0.2}
							>
								Имя
							</TextAnimate>
							<TextAnimate
								by='character'
								duration={0.2}
								className='text-[#696363] dark:text-[#929191] text-sm'
								animation='slideUp'
							>
								{userProfile?.name || ''}
							</TextAnimate>
						</div>
						<button className='cursor-pointer px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700 transition-colors duration-300 rounded-[15px] text-sm'>
							{userProfile && userProfile?.name ? 'Поменять' : 'Указать имя'}
						</button>
					</div>

					{/* <div className='flex justify-between items-center border-b border-[#d9d7d7] dark:border-[#3a3a3a] pb-6'>
						<div>
							<TextAnimate
								className='text-xl font-medium'
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								Электронная почта
							</TextAnimate>
							<TextAnimate
								className='text-[#696363] dark:text-[#929191] text-sm'
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								{(userProfile?.email && maskEmail(userProfile.email)) || ''}
							</TextAnimate>
						</div>
						<button className='cursor-pointer px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700 transition-colors duration-300 rounded-[15px] text-sm'>
							Поменять
						</button>
					</div> */}
					<div className='flex justify-between items-center border-b border-[#d9d7d7] dark:border-[#3a3a3a] pb-6'>
						<div>
							<TextAnimate
								className='text-xl font-medium'
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								Возраст
							</TextAnimate>
							<TextAnimate
								className='text-[#696363] dark:text-[#929191] text-sm'
								animation='slideUp'
								by='character'
								duration={0.2}
							>
								20
							</TextAnimate>
						</div>
						<button className='cursor-pointer px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black hover:dark:bg-white/70 hover:bg-neutral-700 transition-colors duration-300 rounded-[15px] text-sm'>
							Поменять
						</button>
					</div>

					{/* <ResetPassword /> */}
				</div>
			</div>
		</div>
	)
}
