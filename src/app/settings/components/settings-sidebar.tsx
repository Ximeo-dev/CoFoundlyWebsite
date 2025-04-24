import { ISettingsItem, SETTINGS_MENU } from '@/constants/menu.constants'
import { cn } from '@/lib/utils'

interface ISettingsSidebar {
  selected: string
  onSelect: (id: string) => void
}

export default function SettingsSidebar({ selected, onSelect }: ISettingsSidebar) {
	return (
		<aside className='fixed top-0 left-0 pt-[120px] pl-6 border-r border-[#d9d7d7] dark:border-[#3a3a3a] h-full w-60 bg-white dark:bg-[#151515]'>
			<ul className='flex flex-col gap-y-6'>
				{SETTINGS_MENU.map((item: ISettingsItem) => (
					<li
						key={item.id}
						className={cn(
							'flex items-center gap-x-3 text-neutral-500 hover:text-black dark:text-[#939393] dark:hover:text-white cursor-pointer transition-colors',
							selected === item.id
								? 'text-black dark:text-white hover:text-neutral-800 dark:hover:text-white/90'
								: ''
						)}
						onClick={() => onSelect(item.id)}
					>
						<item.icon size={18} /> {item.label}
					</li>
				))}
			</ul>
		</aside>
	)
}