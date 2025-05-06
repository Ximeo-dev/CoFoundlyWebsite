'use client'

export default function StepsIndicator({
	step,
	steps,
	onStepChange,
}: {
	step: number
	steps: string[]
	onStepChange: (index: number) => void
}) {
	return (
		<div className='flex gap-2 items-center justify-center'>
			{steps.map((label, index) => (
				<div
					key={index}
					className='flex flex-col items-center group cursor-pointer'
					onClick={() => onStepChange(index)}
				>
					<div
						className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition 
							${index === step ? 'bg-blue-600' : 'bg-gray-400 group-hover:bg-gray-500'}`}
						title={label}
					>
						{index + 1}
					</div>
					<span className='text-xs mt-1 text-muted-foreground'>{label}</span>
				</div>
			))}
		</div>
	)
}