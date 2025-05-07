import { calculateAge } from '@/utils/calculateAge'
import { z } from 'zod'

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
	bio: z.string().min(10, 'Должно быть больше 10 символов'),
	job: z.string().min(2, 'Должно быть больше 2 символов'),
	skills: z
		.array(z.string())
		.max(20, 'Максимум можно выбрать 20 навыков')
		.optional(),
	languages: z
		.array(z.string())
		.optional(),
	portfolio: z
		.array(z.string().url('Некорректная ссылка'))
		.max(10, 'Максимум 10 ссылок')
		.optional(),
})

export type AnketFormType = z.infer<typeof AnketFormSchema>
