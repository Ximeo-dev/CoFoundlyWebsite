'use client'

import { io } from 'socket.io-client'
import { WS_URL } from '@/constants/api.constants'

const socket = io(WS_URL, {
	path: '/socket.io',
	transports: ['websocket'],
	withCredentials: true,
})

socket.on('connect', () => {
	console.log('[socket] Подключено к серверу Socket.io')
})

socket.on('connect_error', error => {
	console.error('[socket] Ошибка подключения:', error.message)
})

socket.on('disconnect', () => {
	console.log('[socket] Отключено от сервера')
})

export { socket }
