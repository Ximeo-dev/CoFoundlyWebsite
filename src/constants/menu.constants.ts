import { ENDPOINTS } from '@/config/endpoints.config'
import { Briefcase, BriefcaseBusiness, CircleUser, Fingerprint, House, LayoutDashboard, LucideIcon, MessageSquare, MessagesSquare, Settings, User, Users2 } from 'lucide-react'
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
		label: 'Свайпы',
		href: ENDPOINTS.SWIPE_USERS,
	},
	{
		id: 2,
		label: 'Чаты',
		href: ENDPOINTS.CHATS,
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
		href: '/profile',
		icon: LayoutDashboard,
		label: 'Моя анкета',
	},
	{
		href: '/profile/projects',
		icon: Briefcase,
		label: 'Проекты',
	},
	{
		href: '/profile/security',
		icon: Fingerprint,
		label: 'Безопасность',
	},
]

export const TABS = [
	{ id: 'specialists', label: 'Найти специалиста' },
	{ id: 'projects', label: 'Найти проект' },
]

export const SIDEBAR_MENU = [
	{
		icon: MessagesSquare,
		url: '/chats',
	},
]