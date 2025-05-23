import { ENDPOINTS } from '@/config/endpoints.config'
import { Briefcase, BriefcaseBusiness, CircleUser, Fingerprint, Handshake, HeartHandshake, HelpCircle, House, LayoutDashboard, LogOut, LucideIcon, MessageSquare, MessagesSquare, Settings, Shield, User, Users2 } from 'lucide-react'
import { ReactNode } from 'react'

export interface IMenuItem {
	href: string
	icon: LucideIcon
	label: string
}

export interface IHeaderItem {
	id: number
	label?: string
	href: string
	icon?: any
}

export interface IMenuSection {
	label: string
	items: IMenuItem[]
	collapsible?: boolean
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
		label: 'О проекте',
		href: ENDPOINTS.WELCOME,
	},
	{
		id: 3,
		label: 'Премиум',
		href: ENDPOINTS.WELCOME,
	},
	{
		id: 2,
		label: 'Чаты',
		href: ENDPOINTS.WELCOME,
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

export const SIDEBAR_MENU: IMenuSection[] = [
	{
		label: 'Основное',
		items: [
			{
				href: '/',
				icon: LayoutDashboard,
				label: 'Моя анкета',
			},
			{
				href: '/projects',
				icon: Briefcase,
				label: 'Проекты',
			},
			{
				href: '/swipes',
				icon: Handshake,
				label: 'Свайпы',
			},
			{
				href: '/chats',
				icon: MessagesSquare,
				label: 'Чаты',
			},
		],
	},
	{
		label: 'Управление',
		items: [
			{
				href: '/security',
				icon: Fingerprint,
				label: 'Безопасность',
			},
			{
				href: '/logout',
				icon: LogOut,
				label: 'Выход',
			},
		],
	},
	// {
	// 	label: 'Ещё',
	// 	collapsible: true,
	// 	items: [
	// 		{
	// 			href: '/settings',
	// 			icon: Settings,
	// 			label: 'Настройки',
	// 		},
	// 		{
	// 			href: '/support',
	// 			icon: HelpCircle,
	// 			label: 'Поддержка',
	// 		},
	// 	],
	// },
]

export const TABS = [
	{ id: 'specialists', label: 'Найти специалиста' },
	{ id: 'projects', label: 'Найти проект' },
]

export const CHAT_MENU = [
	{
		icon: MessagesSquare,
		url: '/chats',
	},
]