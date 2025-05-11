export default function ChatListItem() {
  return (
		<div className='p-5 flex items-center border-b border-border duration-300 ease-linear transition-colors hover:bg-border cursor-pointer animation-slide-fade'>
			<div className='w-12 h-12 rounded-full border border-border mr-4' />
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					<span>username</span>
					<span className='text-xs opacity-30'>22:05</span>
				</div>
				<div className='opacity-30'>Привет, я UI/UX Designer</div>
			</div>
		</div>
	)
}