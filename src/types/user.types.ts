export interface IUser {
	id: string
	email: string
	username: string
	createdAt: string
	securitySettings: ISecuritySettings
}

interface ISecuritySettings {
	isEmailConfirmed: boolean
	telegramId: string
	twoFactorEnabled: boolean
}