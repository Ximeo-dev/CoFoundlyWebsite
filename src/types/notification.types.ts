import { IMessage } from './chat.types'

export interface INotification {
	notification: {
		id: string
		userId: string
		type: NotificationType
		content: string
		isRead: boolean
		createdAt: Date
	}
	data: IMessage
}

export enum NotificationType {
	MATCH,
	MESSAGE,
	INVITE,
	SYSTEM,
}

export enum NotificationServerEvent {
	NEW_NOTIFICATION = 'notification:new_notification',
}
