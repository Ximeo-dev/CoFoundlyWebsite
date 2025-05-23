'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSocket } from '@/lib/socket'
import { Socket } from 'socket.io-client'
import { getAccessToken } from '@/services/auth-token.services'
import { authService } from '@/services/auth.service'

export const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string>(getAccessToken() ?? '')
	const [socket, setSocket] = useState<Socket>(getSocket(token))

	useEffect(() => {
		let isMounted = true
		socket.auth = { token }
		socket.connect()

		socket.on('disconnect', async reason => {
			console.log('Socket disconnected', reason)
			if (!isMounted) return
			try {
				const response = await authService.getNewTokens()
				setToken(response.data.accessToken)
				socket.auth = { token }
				setTimeout(() => {
					socket.connect()
				}, 2000)
			} catch (err) {
				console.error('Reauth failed', err)
			}
		})

		return () => {
			isMounted = false
			socket.off('disconnect')
			socket.disconnect()
		}
	}, [socket])

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	)
}
