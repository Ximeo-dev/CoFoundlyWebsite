import { calculateAge } from '@/utils/calculateAge'
import { z } from 'zod'

export interface Skill {
	name: string
}

export interface Language {
	name: string
}

export interface Industry {
	name: string
}

export interface Job {
	name: string
}

export interface AnketFormValues {
	name?: string
	birthDate?: string
	bio?: string
	job: string | any
	skills?: Array<string | Skill>
	languages?: Array<string | Language>
	industries?: Array<string | Industry>
	portfolio?: string[]
}

export const AnketFormSchema = z.object({
	name: z.string().min(1, 'Имя обязательно'),
	birthDate: z
		.string()
		.min(1, 'Дата рождения обязательна')
		.refine(
			val => {
				const age = calculateAge(val)
				return age >= 14
			},
			{
				message: 'Возраст должен быть не менее 14 лет',
			}
		),
	bio: z.string().min(10, 'Должно быть более 10 символов').max(256, 'Должно быть менее 256 символов'),
	job: z.string().min(1, 'Род деятельности обязателен'),
	skills: z
		.array(z.string())
		.max(20, 'Максимум можно выбрать 20 навыков')
		.optional(),
	languages: z
		.array(z.string())
		.max(10, 'Максимум можно выбрать 10 языков')
		.optional(),
	industries: z
		.array(z.string())
		.max(5, 'Максимум можно выбрать 5 ниш')
		.optional(),
	portfolio: z
		.array(z.string().url('Некорректная ссылка'))
		.max(10, 'Максимум 10 ссылок')
		.optional(),
})

export type AnketFormType = z.infer<typeof AnketFormSchema>
