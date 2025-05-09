export interface AnketProgressData {
	name?: string
	birthDate?: string
	bio?: string
	job?: string | { name: string }
	skills?: any[]
	industries?: any[]
	languages?: any[]
	portfolio?: string | string[]
}

const fieldWeights: Record<keyof AnketProgressData, number> = {
	name: 18,
	birthDate: 7,
	bio: 18,
	job: 18,
	skills: 18,
	industries: 8,
	languages: 8,
	portfolio: 5,
}

export function calculateProgress(data: AnketProgressData): number {
	let filledWeight = 0
	const totalWeight = 100

	Object.keys(fieldWeights).forEach(field => {
		const value = data[field as keyof AnketProgressData]
		const isFilled =
			(typeof value === 'string' && value.trim() !== '') ||
			(Array.isArray(value) && value.length > 0) ||
			(typeof value === 'object' &&
				value !== null &&
				'name' in value &&
				value.name?.trim() !== '')

		if (isFilled) {
			filledWeight += fieldWeights[field as keyof AnketProgressData]
		}
	})

	const progress = Math.round((filledWeight / totalWeight) * 100)
	return progress
}
