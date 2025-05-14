export interface ProjectProgressData {
	name: string
	description: string
	industry?: string | { name: string }
	jobs?: any[]
	skills?: any[]
	languages?: any[]
}

const fieldWeights: Record<keyof ProjectProgressData, number> = {
	name: 16,
	description: 20,
  industry: 22,
  jobs: 16,
  skills: 16,
  languages: 10
}

export function calculateProjectProgress(data: ProjectProgressData): number {
	let filledWeight = 0
	const totalWeight = 100

	Object.keys(fieldWeights).forEach(field => {
		const value = data[field as keyof ProjectProgressData]
		const isFilled =
			(typeof value === 'string' && value.trim() !== '') ||
			(Array.isArray(value) && value.length > 0) ||
			(typeof value === 'object' &&
				value !== null &&
				'name' in value &&
				value.name?.trim() !== '')

		if (isFilled) {
			filledWeight += fieldWeights[field as keyof ProjectProgressData]
		}
	})

	const progress = Math.round((filledWeight / totalWeight) * 100)
	return progress
}
