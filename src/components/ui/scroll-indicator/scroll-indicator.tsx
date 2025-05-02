export default function ScrollIndicator() {
  return (
    <div className='absolute bottom-3 right-1 z-10' id='scroll-indicator'>
			<div className='w-7 h-7 rounded-full border border-[#d9d7d7] dark:border-zinc-700 flex items-center justify-center'>
				<svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-4 h-4 animate-scroll'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
			</div>
		</div>
  )
}