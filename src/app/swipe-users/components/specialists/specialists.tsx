'use client'

import Avatar from '@/app/profile/components/profile-info/avatar'
import { FloatingDock } from '@/components/ui/floating-dock/floating-dock'
import ScrollIndicator from '@/components/ui/scroll-indicator/scroll-indicator'
import { useAuth } from '@/hooks/useAuth'
import { anketService } from '@/services/anket.service'
import { useQuery } from '@tanstack/react-query'
import { Handshake, Heart, X } from 'lucide-react'
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
		icon: (
			<FaDiscord className='h-full w-full text-black md:text-neutral-600 dark:md:text-zinc-400' />
		),
		href: '#!',
	},
	{
		title: 'Github',
		icon: (
			<FaGithub className='h-full w-full text-black md:text-neutral-600 dark:md:text-zinc-400' />
		),
		href: '#!',
	},
]

export default function Specialists() {
	const { data } = useQuery({
		queryKey: ['get anket'],
		queryFn: () => anketService.getAnket(),
	})

	const { user } = useAuth()

  return (
		<div className='pt-4 sm:pt-8 px-5 sm:grid sm:grid-cols-2 gap-x-7 overflow-hidden'>
			<div className='sm:col-span-1 sticky top-0 sm:h-[650px] w-full flex flex-row sm:flex-col items-center justify-between'>
				<Avatar size={512} className='hidden sm:block' />
				<Avatar size={128} className='block sm:hidden' />

				<div className='sm:flex sm:flex-col sm:items-center sm:justify-between sm:h-full sm:w-full sm:py-8'>
					<FloatingDock items={links} />
					<div className='mt-10'>
						<h1 className='text-2xl sm:text-3xl text-center'>
							{user?.name}, {user?.age}
						</h1>
						<h2 className='text-center mt-1 sm:mt-2'>{data?.job}</h2>
					</div>

					<div className='w-full justify-between mt-6 gap-x-12 hidden sm:flex px-10'>
						<button className='w-16 h-16 rounded-full flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-red-500/30'>
							<X className='w-7 h-7 text-red-500 transition-colors duration-200 group-hover:text-white' />
						</button>

						<button className='w-16 h-16 rounded-full flex items-center justify-center bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-green-500/30'>
							<Handshake className='w-7 h-7 text-green-500 transition-colors duration-200 group-hover:text-white' />
						</button>
					</div>
				</div>
			</div>
			<div className='relative w-full sm:max-h-[650px] mt-8 sm:mt-0'>
				<div className='overflow-y-auto h-full space-y-4 no-scrollbar pb-6'>
					<h2 className='text-2xl font-bold'>Описание</h2>
					<p>{data?.bio}</p>
					{Array(15)
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