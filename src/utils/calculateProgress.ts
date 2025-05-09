// import { AnketFormType } from '@/zod/anket.schema'

// export function calculateProgress(data: Partial<AnketFormType>): number {
// 	const fields: (keyof AnketFormType)[] = [
// 		'name',
// 		'birthDate',
// 		'bio',
// 		'job',
// 		'skills',
// 		'languages',
// 		'industries',
// 		'portfolio',
// 	]

// 	let filled = 0
// 	const total = fields.length

// 	fields.forEach(field => {
// 		const value = data[field]

// 		if (field === 'job') {
// 			if (typeof value === 'string' && value.trim() !== '') {
// 				filled++
// 			} else if (typeof value === 'object' && value?.name?.trim()) {
// 				filled++
// 			}
// 		} else if (typeof value === 'string') {
// 			if (value.trim() !== '') {
// 				filled++
// 			}
// 		} else if (Array.isArray(value)) {
// 			if (value.length > 0) {
// 				filled++
// 			}
// 		}
// 	})

// 	return Math.round((filled / total) * 100)
// }
