'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useSocket } from '@/hooks/useSocket'
import { INotification, NotificationServerEvent } from '@/types/notification.types'

interface NotificationContextType {
	notifications: INotification[]
	removeNotification: (id: string) => void
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

	const removeNotification = (id: string) => {
		setNotifications(prev => prev.filter(n => n.notification.id !== id))
	}

	return (
		<NotificationContext.Provider value={{ notifications, removeNotification }}>
			{children}
		</NotificationContext.Provider>
	)
}