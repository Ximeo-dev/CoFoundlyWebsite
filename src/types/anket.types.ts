export interface IAnketRequest {
	bio: string
	job: string
	skills: string[]
	portfolio: string[]
	timezone: string
}

export interface IAnket {
	id: number
	userId: string
	bio: string
	timezone: string
	portfolio: string
	job: string
	likes: string
}
