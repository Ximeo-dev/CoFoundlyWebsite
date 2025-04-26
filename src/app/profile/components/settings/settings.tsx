'use client'

import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { useProfileData } from '@/hooks/useProfileData'
import maskEmail from '@/utils/maskEmail'
import ResetPassword from '../profile-info/reset-password'

export default function Settings() {
  const { userProfile } = useProfileData()

  return (
		<div className='flex flex-col items-center w-full'>
			<TextAnimate
				animation='slideUp'
				by='character'
				duration={0.2}
				className='text-3xl font-semibold mt-2 mb-12 text-start'
			>
				Безопасность
			</TextAnimate>
			<div className='md:lg-[350px] lg:w-[400px] xl:w-[600px] mb-6'>
				<div className='space-y-8'>
					<div className='flex justify-between items-center border-b border-[#d9d7d7] dark:border-[#3a3a3a] pb-6'>
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
					</div>

					<div className='flex justify-between items-center border-b border-[#d9d7d7] dark:border-[#3a3a3a] pb-6'>
						<ResetPassword />
					</div>
				</div>
			</div>
		</div>
	)
}