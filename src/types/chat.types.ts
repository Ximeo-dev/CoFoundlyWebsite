import { IAnket } from './anket.types'
import { IUser } from './user.types'

export enum ChatClientEvent {
	SEND_MESSAGE = 'chat:send_message',
	MARK_READ = 'chat:mark_read',
	TYPING = 'chat:typing',
	DELETE_MESSAGE = 'chat:delete_message',
	EDIT_MESSAGE = 'chat:edit_message',
}

export enum ChatServerEvent {
	NEW_MESSAGE = 'new_message',
	READ = 'chat:read',
	USER_TYPING = 'chat:typing',
	MESSAGE_DELETED = 'chat:deleted',
	MESSAGE_EDITED = 'chat:edited',
}

export interface IChat {
	id: string
	type: string
	participants: IParticipant[]
	messages: IMessage[]
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
	isEdited: boolean
	sender: ISender
}

export interface ISender {
	id: string
	displayUsername: string
}