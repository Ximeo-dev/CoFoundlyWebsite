export interface IUser {
	id: string
  name: string
	email: string
	age: number
	avatarUrl: string
	createdAt: string
	securitySettings: ISecuritySettings
}

interface ISecuritySettings {
	isEmailConfirmed: boolean
	telegramId: string
	twoFactorEnabled: boolean
}