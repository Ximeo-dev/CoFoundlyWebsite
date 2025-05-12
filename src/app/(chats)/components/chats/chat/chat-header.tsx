import { Search } from 'lucide-react'

export default function ChatHeader() {
  return (
		<div className='p-5 flex items-center justify-between'>
			<div className='flex items-center'>
				<div className='w-12 h-12 rounded-full border border-border mr-4' />
        <div className='text-sm'>
          <div className='mb-1'>
            username
          </div>
          <div>
            UI/UX Designer
          </div>
        </div>
			</div>
      <button className='text-[#7c7275] hover:text-white transition-colors duration-300 ease-linear'>
        <Search />
      </button>
		</div>
	)
}