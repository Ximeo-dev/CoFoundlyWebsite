import { IMessage } from '@/types/chat.types'

export function groupMessagesByDate(messages: IMessage[]) {
	return messages.reduce((acc, message) => {
		const date = new Date(message.sentAt).toISOString().split('T')[0]
		if (!acc[date]) {
			acc[date] = []
		}
		acc[date].push(message)
		return acc
	}, {} as Record<string, IMessage[]>)
}
