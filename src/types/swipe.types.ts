export interface ISwipeActionResponse extends IMatchStatus {
	success: boolean
	message?: string
}

interface IMatchStatus {
	isMatch: boolean
}