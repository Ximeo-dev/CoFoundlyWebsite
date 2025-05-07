import { ISkill } from '@/types/skills.types'

export function SkillsSort(
	skills: ISkill[],
	query: string
): ISkill[] {
	const trimmedQuery = query.trim().toLowerCase()
	if (!trimmedQuery) return skills.slice(0, 50)

	return skills
		.filter(skill => skill.name.toLowerCase().includes(trimmedQuery))
		.sort((a, b) => {
			const aStartsWith = a.name.toLowerCase().startsWith(trimmedQuery)
			const bStartsWith = b.name.toLowerCase().startsWith(trimmedQuery)

			if (aStartsWith && !bStartsWith) return -1
			if (!aStartsWith && bStartsWith) return 1

			return a.name.localeCompare(b.name)
		})
		.slice(0, 40)
}
