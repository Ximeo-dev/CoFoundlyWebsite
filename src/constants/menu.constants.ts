import { ENDPOINTS } from '@/config/endpoints.config'
import { CircleEllipsis, CircleUser, House, LucideIcon } from 'lucide-react'

export interface IMenuItem {
	id: number
	label?: string
	href: string
	icon?: any
}

export const MENU = [
	{
		id: 1,
		label: 'Проекты',
		href: ENDPOINTS.SWIPE,
	},
	{
		id: 2,
		label: 'Исполнители',
		href: ENDPOINTS.SWIPE,
	},
	{
		id: 3,
		label: 'Премиум',
		href: ENDPOINTS.PRICING,
	},
]

export const MENU_MORE = [
	{
		id: 1,
		label: 'Поддержка',
		href: ENDPOINTS.SUPPORT,
	},
	{
		id: 2,
		label: 'Конфиденциальность',
		href: ENDPOINTS.PRIVACY,
	},
	{
		id: 3,
		label: 'Поддержка',
		href: ENDPOINTS.SUPPORT,
	},
	{
		id: 4,
		label: 'Конфиденциальность',
		href: ENDPOINTS.PRIVACY,
	},
]

export const MOBILE_MENU = [
	{
		id: 1,
		icon: House,
		href: ENDPOINTS.HOME
	},
	{
		id: 2,
		icon: CircleUser,
		href: ENDPOINTS.PROFILE
	},
]