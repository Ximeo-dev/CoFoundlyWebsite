import { cn } from '@/lib/utils'
import {
	AnimatePresence,
	MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'

export const FloatingDock = ({
	items,
	desktopClassName,
	mobileClassName,
	bgColor
}: {
	items: { title: string; icon: React.ReactNode; href: string }[]
	desktopClassName?: string
	mobileClassName?: string
	bgColor?: string
}) => {
	return (
		<>
			<FloatingDockDesktop items={items} className={desktopClassName} />
			<FloatingDockMobile items={items} className={mobileClassName} />
		</>
	)
}

const FloatingDockMobile = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode }[]
	className?: string
}) => {
	return (
		<div className={cn('block md:hidden', className)}>
			<div className='flex gap-x-4'>
				{items.map((item, idx) => (
					<div key={idx} className='flex items-center justify-center'>
						<div
							key={item.title}
							className='h-8 w-8 rounded-full bg-white border border-[#d9d7d7] dark:border-[#3a3a3a] flex items-center justify-center'
						>
							<div className='h-4 w-4'>{item.icon}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const FloatingDockDesktop = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode }[]
	className?: string
}) => {
	let mouseX = useMotionValue(Infinity)
	return (
		<motion.div
			onMouseMove={e => mouseX.set(e.pageX)}
			onMouseLeave={() => mouseX.set(Infinity)}
			className={cn(
				'hidden md:flex h-16 gap-7 items-end justify-center rounded-2xl bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] px-10 pb-3 max-w-[300px]',
				className
			)}
		>
			{items.map(item => (
				<IconContainer mouseX={mouseX} key={item.title} {...item} />
			))}
		</motion.div>
	)
}

function IconContainer({
	mouseX,
	title,
	icon,
}: {
	mouseX: MotionValue
	title: string
	icon: React.ReactNode
}) {
	let ref = useRef<HTMLDivElement>(null)

	let distance = useTransform(mouseX, val => {
		let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

		return val - bounds.x - bounds.width / 2
	})

	let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
	let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

	let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
	let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

	let width = useSpring(widthTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	})
	let height = useSpring(heightTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	})

	let widthIcon = useSpring(widthTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	})
	let heightIcon = useSpring(heightTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	})

	const [hovered, setHovered] = useState(false)

	return (
		<div className='cursor-pointer'>
			<motion.div
				ref={ref}
				style={{ width, height }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className='aspect-square rounded-full isolate backdrop-blur-[6px] flex border border-[#d9d7d7] dark:border-[#3a3a3a] items-center justify-center relative'
			>
				<AnimatePresence>
					{hovered && (
						<motion.div
							initial={{ opacity: 0, y: 10, x: '-50%' }}
							animate={{ opacity: 1, y: 0, x: '-50%' }}
							exit={{ opacity: 0, y: 2, x: '-50%' }}
							className='px-2.5 py-1 whitespace-pre rounded-[15px] border bg-sky-200 dark:bg-purple-300 text-black font-bold absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs'
						>
							{title}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div
					style={{ width: widthIcon, height: heightIcon }}
					className='flex items-center justify-center text-green-400'
				>
					{icon}
				</motion.div>
			</motion.div>
		</div>
	)
}
