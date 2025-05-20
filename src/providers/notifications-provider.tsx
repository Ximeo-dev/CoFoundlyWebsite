'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useSocket } from '@/hooks/useSocket'
import { INotification, NotificationServerEvent } from '@/types/notification.types'

interface NotificationContextType {
	notifications: INotification[]
	// markAsRead: (notificationId: string) => void
	// markAllAsRead: () => void
}

export const NotificationContext = createContext<
	NotificationContextType | undefined
>(undefined)

export const NotificationProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const socket = useSocket()
	const [notifications, setNotifications] = useState<INotification[]>([])

	useEffect(() => {
		const handleNewNotification = (notification: INotification) => {
      console.log('[Notification] New notification received:', {
				id: notification.notification.id,
				type: notification.notification.type,
				content: notification.notification.content,
				createdAt: notification.notification.createdAt,
			})
			setNotifications(prev => [notification, ...prev])
		}

		socket.on(NotificationServerEvent.NEW_NOTIFICATION, handleNewNotification)

		return () => {
			socket.off(
				NotificationServerEvent.NEW_NOTIFICATION,
				handleNewNotification
			)
		}
	}, [socket])

	// const markAsRead = (notificationId: string) => {
	// 	setNotifications(prev =>
	// 		prev.map(n =>
	// 			n.notification.id === notificationId
	// 				? { ...n, notification: { ...n.notification, isRead: true } }
	// 				: n
	// 		)
	// 	)
	// }

	// const markAllAsRead = () => {
	// 	setNotifications(prev =>
	// 		prev.map(n => ({
	// 			...n,
	// 			notification: { ...n.notification, isRead: true },
	// 		}))
	// 	)
	// }

	return (
		<NotificationContext.Provider
			value={{ notifications }}
		>
			{children}
		</NotificationContext.Provider>
	)
}
