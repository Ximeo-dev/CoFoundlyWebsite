export interface IAnketRequest {
	name: string
	birthDate: string
	bio?: string
	job?: string
	skills?: string[]
	industries?: string[]
	languages?: string[]
	portfolio?: string[]
	hasAvatar?: boolean
	likes?: number
}

export interface IAnket extends IAnketRequest {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
}