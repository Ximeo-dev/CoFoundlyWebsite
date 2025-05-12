export interface IAnketRequest {
	name: string
	birthDate: string
	bio?: string
	job: {
		name: string
	} | string
	skills?: string[]
	industries?: string[]
	languages?: string[]
	portfolio?: string[]
	hasAvatar?: boolean
	likes?: number
}

interface IJob {
	name: string 
}

export interface IAnket extends IAnketRequest {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
}