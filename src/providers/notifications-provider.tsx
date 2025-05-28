'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import {
	INotification,
	NotificationServerEvent,
} from '@/types/notification.types'

interface NotificationContextType {
	notifications: INotification[]
	removeNotification: (id: string) => void
	activeChatUserId: string | null
	setActiveChatUserId: (userId: string | null) => void
	isSoundEnabled: boolean
	toggleSound: (enabled: boolean) => void
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
	const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null)
	const [isSoundEnabled, setIsSoundEnabled] = useState(true)

	useEffect(() => {
		const handleNewNotification = (notification: INotification) => {
			if (notification?.data.sender.id === activeChatUserId) {
				return
			}

			if (isSoundEnabled && !activeChatUserId) {
				try {
					const audio = new Audio('/sounds/notification.mp3')
					audio
						.play()
						.catch(error =>
							console.error('[Notification] Error playing sound:', error)
						)
				} catch (error) {
					console.error('Error creating audio:', error)
				}
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
	}, [socket, activeChatUserId, isSoundEnabled])

	const removeNotification = (id: string) => {
		setNotifications(prev => prev.filter(n => n.notification.id !== id))
	}

	const toggleSound = (enabled: boolean) => {
		setIsSoundEnabled(enabled)
	}

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				removeNotification,
				activeChatUserId,
				setActiveChatUserId,
				isSoundEnabled,
				toggleSound,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}
