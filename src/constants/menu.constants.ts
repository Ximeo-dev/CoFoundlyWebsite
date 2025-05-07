import { ENDPOINTS } from '@/config/endpoints.config'
import { CircleEllipsis, CircleUser, Fingerprint, House, LucideIcon, User, Wallet } from 'lucide-react'
import { ReactNode } from 'react'

export interface IMenuItem {
	id: number
	label?: string
	href: string
	icon?: any
}

export interface ISettingsItem {
	id: string
	icon: LucideIcon
	label: string
	children?	: ReactNode
}

export const MENU = [
	{
		id: 1,
		label: 'Проекты',
		href: ENDPOINTS.SWIPE_USERS,
	},
	{
		id: 2,
		label: 'Исполнители',
		href: ENDPOINTS.SWIPE_USERS,
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
		label: 'Проекты',
		href: ENDPOINTS.SWIPE_USERS,
	},
	{
		id: 4,
		label: 'Исполнители',
		href: ENDPOINTS.SWIPE_USERS,
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

export const PROFILE_MENU = [
	{
		id: 'my-anket',
		icon: User,
		label: 'Моя анкета',
	},
	{
		id: 'project-anket',
		icon: CircleUser,
		label: 'Анкета проекта',
	},
	{
		id: 'security',
		icon: Fingerprint,
		label: 'Безопасность',
	},
]

export const TABS = [
	{ id: 'specialists', label: 'Найти специалиста' },
	{ id: 'projects', label: 'Найти проект' },
]