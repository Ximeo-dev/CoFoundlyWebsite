import { NotificationContext } from '@/providers/notifications-provider'
import { useContext } from 'react'

export const useNotifications = () => {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error(
			'useNotifications must be used within a NotificationProvider'
		)
	}
	return context
}
