export default function ProgressBar({ percent }: { percent: number }) {
	return (
		<div className='w-32 md:w-44'>
			<span className='text-xs text-muted-foreground block mb-1'>
				Заполнено на {percent}%
			</span>
			<div className='w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2'>
				<div
					className='bg-primary h-2 rounded-full transition-all duration-500'
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	)
}