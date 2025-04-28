import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Исполнители',
}

export default function SwipeUsersPage() {
  return (
		<div className='min-h-screen mb-10'>
			<div className='flex justify-center items-center'>
				<TextAnimate
					animation='slideUp'
					className='text-lg sm:text-[1.25rem] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.2rem] 2xl:text-[2.5rem] text-center pt-14 sm:pt-[80px] md:pt-[120px] lg:pt-[110px] xl:pt-[160px] select-none max-w-[600px] leading-12'
				>
					Свайпай, чтобы выбрать подходящего специалиста
				</TextAnimate>
			</div>
      <div className='w-full rounded-[30px] bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] h-[700px] mt-12'>
       
      </div>
		</div>
	)
}
