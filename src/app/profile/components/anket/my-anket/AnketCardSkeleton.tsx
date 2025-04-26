export default function AnketCardSkeleton() {
	return (
		<div className='bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-sm mx-auto flex flex-col items-center animate-pulse'>
			<div className='w-24 h-24 rounded-full bg-gray-300 dark:bg-zinc-700 mb-4' />

			<div className='w-32 h-5 bg-gray-300 dark:bg-zinc-700 rounded mb-2' />

			<div className='w-20 h-4 bg-gray-300 dark:bg-zinc-700 rounded mb-4' />

			<div className='flex flex-wrap gap-2 justify-center mb-4'>
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className='w-16 h-6 bg-gray-300 dark:bg-zinc-700 rounded-full'
					/>
				))}
			</div>

			<div className='w-full h-16 bg-gray-300 dark:bg-zinc-700 rounded' />
		</div>
	)
}
