import Avatar from '@/app/profile/components/profile-info/avatar'
import { ISender } from '@/types/chat.types'
import { IUser } from '@/types/user.types'
import { Search } from 'lucide-react'

export default function ChatHeader({
	correspondent,
}: {
	correspondent?: ISender
}) {
	return (
		<div className='p-5 flex items-center justify-between'>
			<div className='flex items-center'>
				<Avatar size={64} id={correspondent?.id} />
				<div className='text-sm'>
					<div className='mb-1'>
						{correspondent?.displayUsername || 'Неизвестный пользователь'}
					</div>
				</div>
			</div>
			<button className='md:hidden text-[#7c7275] hover:text-white transition-colors duration-300 ease-linear mr-4'>
				<Search />
			</button>
		</div>
	)
}
