export interface IProjectRequest {
	name: string
	description: string
	industry: string
	languages?: string[]
	skills?: string[]
	jobs?: string[]
}

export interface IProject extends IProjectRequest {
  id: string
  hasAvatar: boolean
  ownerId: string
  createdAt: string
}