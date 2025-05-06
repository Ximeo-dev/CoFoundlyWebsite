import { IAnket } from '@/types/anket.types'

export const calculateCompletion = (anket: IAnket) => {
	const totalFields = 6
	let filled = 0

	if (anket.name) filled++
	if (anket.birthDate) filled++
	if (anket.bio) filled++
	if (anket.job) filled++
	if (anket.skills?.length) filled++
	if (anket.languages?.length) filled++

	return Math.floor((filled / totalFields) * 100)
}
