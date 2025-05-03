'use client'

export default function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const percentage = ((step + 1) / totalSteps) * 100
  
  return (
		<div className='w-full bg-gray-200 h-2 rounded-[15px] mb-12'>
			<div
				className='h-2 bg-cyan-300 rounded-[15px]'
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	)
}