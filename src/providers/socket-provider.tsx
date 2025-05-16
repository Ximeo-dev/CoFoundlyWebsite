'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { getSocket } from '@/lib/socket'

export const SocketContext = createContext<Socket | undefined>(undefined)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const socketInstance = getSocket()

		socketInstance.on('connect', () => {
			console.log('✅ Socket connected:', socketInstance.id)
		})

		// Подписка на disconnect
		socketInstance.on('disconnect', reason => {
			console.warn('⚠️ Socket disconnected:', reason)
		})

		// Подписка на ошибки подключения
		socketInstance.on('errors', err => {
			console.error('❌ Socket connection error:', err)
		})

		setSocket(socketInstance)

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	if (!socket) return null

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	)
}
