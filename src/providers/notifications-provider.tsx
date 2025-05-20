'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useSocket } from '@/hooks/useSocket'
import {
	INotification,
	NotificationServerEvent,
} from '@/types/notification.types'

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
				isRead: notification.notification.isRead,
				createdAt: notification.notification.createdAt,
			})

			try {
				const audio = new Audio('/sounds/notification.mp3')
				audio
					.play()
					.then(() =>
						console.log(
							'[Notification] Sound played successfully:',
							notification.notification.id
						)
					)
					.catch(error =>
						console.error('[Notification] Error playing sound:', error)
					)
			} catch (error) {
				console.error('[Notification] Failed to initialize audio:', error)
			}

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
		console.log('[Notification] Removing notification:', { id })
		setNotifications(prev => prev.filter(n => n.notification.id !== id))
	}

	return (
		<NotificationContext.Provider value={{ notifications, removeNotification }}>
			{children}
		</NotificationContext.Provider>
	)
}
