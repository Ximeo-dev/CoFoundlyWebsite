import { IAnket } from './anket.types'

export enum ChatClientEvent {
	SEND_MESSAGE = 'chat:send_message',
	MARK_READ = 'chat:mark_read',
	TYPING = 'chat:typing',
	DELETE_MESSAGE = 'chat:delete_message',
	EDIT_MESSAGE = 'chat:edit_message',
}

export enum ChatServerEvent {
	NEW_MESSAGE = 'chat:new_message',
	MESSAGE_READ = 'chat:message_read',
	USER_TYPING = 'chat:user_typing',
	MESSAGE_DELETED = 'chat:message_deleted',
	MESSAGE_EDITED = 'chat:message_edited',
	NEW_CHAT = 'chat:new_chat',
}

export interface IChat {
	id: string
	type: string
	participants: IParticipant[]
	messages: IMessage[]
	unreadMessages: number
}

export interface IParticipant {
	userId: string
	displayUsername: string
	profile?: IAnket
}

export interface IMessage {
	id: string
	chatId: string
	senderId: string
	content: string
	sentAt: string
	updatedAt: string
	createdAt: string
	isEdited: boolean
	sender: ISender
	readReceipt?: IReadReceipt[]
}

export interface ISender {
	id: string
	displayUsername: string
}

export interface IReadReceipt {
	id: string
	messageId: string
	userId: string
	readAt: string
}