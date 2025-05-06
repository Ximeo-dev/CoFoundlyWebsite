import { z } from 'zod'

export const AnketFormSchema = z.object({
	name: z.string().min(1, 'Имя обязательно'),
	birthDate: z.string().min(1, 'Дата рождения обязательна'),
	bio: z.string().min(10, 'Минимум 10 символов').optional(),
	job: z.string().min(2, 'Минимум 2 символа'),
	skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
	languages: z.array(z.string()).min(1, 'Укажите хотя бы один язык'),
	portfolio: z.array(z.string()).min(1, 'Укажите хотя бы одну ссылку'),
})

export type AnketFormType = z.infer<typeof AnketFormSchema>
