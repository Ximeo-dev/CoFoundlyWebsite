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
	bio: z.string().min(10, 'Минимум 10 символов'),
	job: z.string().min(2, 'Минимум 2 символа'),
	skills: z.array(z.string()).optional(),
	languages: z.array(z.string()).optional(),
	portfolio: z.array(z.string()).optional(),
})

export type AnketFormType = z.infer<typeof AnketFormSchema>
