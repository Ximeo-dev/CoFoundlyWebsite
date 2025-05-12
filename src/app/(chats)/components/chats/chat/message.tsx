'use client'

export function Message() {
	const isSender = true

	return (
		<div
			className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}
		>
			<div
				className={`relative flex items-center ${
					isSender ? 'flex-row-reverse' : ''
				}`}
			>
				<div className='w-12 h-12 rounded-full border border-border' />

				<div className={isSender ? 'mr-3' : 'ml-3'}>
					<div
						className={`text-sm text-white py-1.5 mt-4 px-3 rounded-2xl ${
							isSender
								? 'rounded-tr-none bg-primary'
								: 'rounded-tl-none bg-border'
						}`}
					>
						Привет! Как дела?
					</div>
					<div
						className={`text-xs opacity-30 block mt-1.5 ${
							isSender ? 'text-right' : 'text-left'
						}`}
					>
						22:05
					</div>
				</div>
			</div>
		</div>
	)
}
