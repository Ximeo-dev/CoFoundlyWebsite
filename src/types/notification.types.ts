export interface INotification {
	notification: {
		id: string
		userId: string
		type: NotificationType
		content: string
		isRead: boolean
		createdAt: Date
	}
	data: any // При получении в зависимости от notification.type кастишь дату к IMessage/IInvite/IMatch
}

export enum NotificationType {
	MATCH,
	MESSAGE,
	INVITE,
	SYSTEM,
}

export enum NotificationClientEvent {
	MARK_READ = 'notification:mark_read', // отправляешь, в callback получаешь обратно INotification[], скрываешь их на фронте
}

export enum NotificationServerEvent {
	NEW_NOTIFICATION = 'notification:new_notification', // слушаешь, выводишь новые уведомления
}
