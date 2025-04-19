import { ENPOINTS } from '@/config/endpoints.config'

export interface IMenuItem {
	id: number
	label: string
	href?: string
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
	{
		id: 4,
		label: 'Дополнительно',
	},
]