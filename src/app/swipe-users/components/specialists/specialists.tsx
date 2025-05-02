'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { FloatingDock } from '@/components/ui/floating-dock/floating-dock'
import ScrollIndicator from '@/components/ui/scroll-indicator/scroll-indicator'
import { FaDiscord, FaGithub, FaTelegramPlane } from 'react-icons/fa'

export const links = [
	{
		title: 'Телеграм',
		icon: (
			<FaTelegramPlane className='h-full w-full text-black md:text-neutral-600 dark:md:text-zinc-400' />
		),
		href: '#!',
	},

	{
		title: 'Дискорд',
		icon: <FaDiscord className='h-full w-full text-black md:text-neutral-600 dark:md:text-zinc-400' />,
		href: '#!',
	},
	{
		title: 'Github',
		icon: <FaGithub className='h-full w-full text-black md:text-neutral-600 dark:md:text-zinc-400' />,
		href: '#!',
	},
]

export default function Specialists() {
  return (
		<div className='pt-8 px-5 grid grid-cols-2 gap-x-7 overflow-hidden'>
			<div className='col-span-1 sticky top-0 h-[650px] w-full flex flex-col items-center justify-between'>
				<Avatar size={512} className='hidden md:block' />
				<Avatar size={128} className='block md:hidden' />

				<div className='flex flex-col items-center justify-between h-full w-full py-8'>
					<FloatingDock items={links} />

					<div className='mt-auto flex justify-end'>buttons</div>
				</div>
			</div>
			<div className='relative w-full max-h-[650px]'>
				<div className='overflow-y-auto h-full space-y-4 no-scrollbar pb-6'>
					<h2 className='text-2xl font-bold'>Описание</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste itaque
						ut maiores quod ducimus expedita fugit quis natus cupiditate
						similique.
					</p>
					{Array(30)
						.fill(0)
						.map((_, i) => (
							<p key={i}>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
								similique.
							</p>
						))}
				</div>

				<ScrollIndicator />
			</div>
		</div>
	)
}