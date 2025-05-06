export interface IAnketRequest {
	name: string
	birthDate: string
	bio?: string
	job?: string
	skills?: string[]
	languages?: string[]
	portfolio?: string[]
}

export interface IAnket extends IAnketRequest {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
}