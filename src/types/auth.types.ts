import { IUser } from './user.types'

export interface ILoginForm {
  email: string
  password: string
}

export interface IAuthForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface IConfirmPassword {
  currentPassword: string
  newPassword: string
}

export interface IAuthResponse {
  user: IUser
  accessToken: string
}