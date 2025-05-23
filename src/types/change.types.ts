export interface IChangePasswordDto {
	currentPassword: string
	newPassword: string
}

export interface IChangePasswordForm {
	currentPassword: string
	newPassword: string
	newPasswordConfirm: string
}

export type IChangeEmailDto = IChangeEmailForm

export interface IChangeEmailForm {
	currentPassword: string
	newEmail: string
}