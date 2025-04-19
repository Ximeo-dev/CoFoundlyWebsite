'use client'

import { ArrowLeft, ArrowRight, Handshake, ListFilterPlus, OctagonX } from 'lucide-react'
import { useMotionValue, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'

const cardsData = [
	{
		id: 1,
		name: 'хог, 23',
		job: 'UX/UI Designer',
		bages: ['Figma', 'UX Research'],
	},
	{
		id: 2,
		name: 'марат, 23',
		job: 'UX/UI Designer',
		bages: ['Figma', 'UX Research'],
	},
	{
		id: 3,
		name: 'тунтун, 20',
		job: 'UX/UI Designer',
		bages: ['Figma', 'UX Research'],
	},
	{
		id: 4,
		name: 'нонет, 10',
		job: 'UX/UI Designer',
		bages: ['Figma', 'UX Research'],
	},
	{
		id: 5,
		name: 'лох, 19',
		job: 'UX/UI Designer',
		bages: ['Figma', 'UX Research'],
	},
]

export default function Card() {
	const [cards, setCards] = useState(cardsData)
	const [openModal, setOpenModal] = useState(false)
	const x = useMotionValue(0)
	const rotate = useTransform(x, [-300, 300], [-40, 40])

	const bgYesOpacity = useTransform(x, [10, 170], [0, 1])
	const bgNopeOpacity = useTransform(x, [-170, -10], [1, 0])

	const bgYesColor = useTransform(
		bgYesOpacity,
		[0, 1],
		['rgba(0, 0, 0, 0)', 'rgba(0, 255, 0, 0.2)']
	)
	const bgNopeColor = useTransform(
		bgNopeOpacity,
		[0, 1],
		['rgba(0, 0, 0, 0)', 'rgba(255, 0, 0, 0.2)']
	)

	const removeCard = () => {
		setCards(prev => prev.slice(1))
	}

	return (
		<>
			<div className='w-[395px] h-[700px] bg-white relative overflow-hidden'>
				<div className='flex items-center justify-center'>
					<Image src={'/logo.svg'} alt='logo' width={50} height={50} />
				</div>
				<ListFilterPlus className='text-black absolute right-5 top-3.5' />

				<div className='relative w-full h-full mt-3'>
					{cards.map((card, i) => {
						return (
							<motion.div
								key={card.id}
								drag='x'
								style={{ zIndex: cards.length - i, x, rotate }}
								dragConstraints={{ left: 0, right: 0 }}
								onDragEnd={(event, info) => {
									if (info.offset.x > 200 || info.offset.x < -200) {
										removeCard()
									}
								}}
								className='absolute top-0 left-0 w-full px-[30px]'
							>
								<div className='rounded-[20px] border border-[#D9D7D7] bg-white h-[600px]'>
									<div className='rounded-[20px] mt-6 w-[297px] h-[156px] border border-[#D9D7D7] ml-4'></div>
									<div className='text-center mt-3 px-5'>
										<h1 className='text-3xl mb-2 text-black'>{card.name}</h1>
										<h2 className='text-[#585555]'>{card.job}</h2>
									</div>
									<div className='mt-5 flex items-center justify-center gap-x-8'>
										{card.bages.map((badge, index) => (
											<div
												key={index}
												className='border border-[#D9D7D7] rounded-[10px] py-1 px-3'
											>
												<h2 className='text-black'>{badge}</h2>
											</div>
										))}
									</div>
									<div className='mt-10 px-5'>
										<p className='text-black'>О себе:</p>
									</div>
									<div className='flex items-center justify-center mt-28'>
										<button
											onClick={() => setOpenModal(true)}
											className='cursor-pointer rounded-lg px-8 py-2 bg-black'
										>
											Подробнее
										</button>
									</div>
									<div className='w-[314px] h-[1px] bg-[#D9D7D7] mt-5' />
									<div className='flex items-center justify-between'>
										<motion.button
											style={{ backgroundColor: bgNopeColor }}
											className='w-1/2 cursor-pointer border-r border-[#D9D7D7] py-3 flex items-center justify-center rounded-bl-[20px]'
										>
											<span className='flex items-center gap-x-1.5'>
												<ArrowLeft className='text-black' />
												<OctagonX className='text-black' />
											</span>
										</motion.button>

										<motion.button
											style={{ backgroundColor: bgYesColor }}
											className='w-1/2 cursor-pointer py-3 flex items-center justify-center rounded-br-[20px]'
										>
											<span className='flex items-center gap-x-1.5'>
												<Handshake className='text-black' />
												<ArrowRight className='text-black' />
											</span>
										</motion.button>
									</div>
								</div>
								{/* <div className='absolute bottom-10 w-[335px] h-[1px] bg-[#D9D7D7] mt-5' />
								<div className='absolute rotate-90 w-[41px] h-[1px] bottom-5 left-1/2 -translate-x-1/2 bg-[#D9D7D7]' /> */}
							</motion.div>
						)
					})}
				</div>
			</div>
			{openModal && (
				<Modal
					isOpen={openModal}
					onClose={() => setOpenModal(false)}
					className='min-w-[450px] min-h-[500px]'
				></Modal>
			)}
		</>
	)
}
