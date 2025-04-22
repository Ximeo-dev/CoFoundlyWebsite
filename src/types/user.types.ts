export interface IUser {
	id: string
	email: string
  name: string
  bio: any
  status: string
  timezone: any
	createdAt: string
	securitySettings: ISecuritySettings
}

interface ISecuritySettings {
	isEmailConfirmed: boolean
	twoFactorEnabled: boolean
}