import { SocketContext } from '@/providers/socket-provider'
import { useContext } from 'react'

export const useSocket = () => {
	const socket = useContext(SocketContext)
	if (!socket) {
		throw new Error('useSocket должен вызываться внутри SocketProvider')
	}
	return socket
}
