import { ENPOINTS } from '@/config/endpoints.config'
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
		href: ENPOINTS.SWIPE,
	},
	{
		id: 2,
		label: 'Идеи',
		href: ENPOINTS.IDEAS,
	},
	{
		id: 3,
		label: 'Премиум',
		href: ENPOINTS.PRICING,
	},
]

export const MENU_MORE = [
	{
		id: 1,
		label: 'Поддержка',
		href: ENPOINTS.SUPPORT,
	},
	{
		id: 2,
		label: 'Конфиденциальность',
		href: ENPOINTS.PRIVACY,
	},
	{
		id: 3,
		label: 'Поддержка',
		href: ENPOINTS.SUPPORT,
	},
	{
		id: 4,
		label: 'Конфиденциальность',
		href: ENPOINTS.PRIVACY,
	},
]

export const MOBILE_MENU = [
	{
		id: 1,
		icon: House,
		href: ENPOINTS.HOME
	},
	{
		id: 2,
		icon: CircleUser,
		href: ENPOINTS.PROFILE
	},
]