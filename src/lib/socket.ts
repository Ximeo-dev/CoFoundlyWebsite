import { WS_URL } from '@/constants/api.constants'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

/**
 * Инициализирует или возвращает существующий экземпляр Socket.IO.
 * @param token - JWT для авторизации при подключении
 */
export function getSocket(token: string): Socket {
	if (!socket) {
		socket = io(WS_URL, {
			auth: { token },
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 1000,
			autoConnect: false,
		})

		socket.on('connect', () => console.log('✅ Socket connected:', socket?.id))

		socket.on('disconnect', reason =>
			console.warn('⚠️ Socket disconnected:', reason)
		)

		socket.on('errors', err => {
			console.error('❌ Socket error:', err)
		})
	}
	return socket
}
