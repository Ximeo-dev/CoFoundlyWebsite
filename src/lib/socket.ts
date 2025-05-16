'use client'

import { io, Socket } from 'socket.io-client'
import { WS_URL } from '@/constants/api.constants'
import { getAccessToken } from '@/services/auth-token.services'

let socket: Socket | null = null

export const getSocket = (): Socket => {
	if (!socket) {
		socket = io(WS_URL, {
			// path: '/socket.io',
			transports: ['websocket'],
			withCredentials: true,
			auth: {
				token: getAccessToken(),
			},
		})
	}

	return socket
}
