import { z } from 'zod'

export const AnketSchema = z.object({
	// name: z.string().min(2, 'Имя слишком короткое'),
	// age: z.number().min(14, 'Минимальный возраст — 14'),
	job: z.string().min(2, 'Укажите профессию'),
	bio: z.string().min(10, 'Минимум 10 символов'),
	skills: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
	portfolio: z.array(z.string().url('Некорректная ссылка')),
	timezone: z.string(),
})

export type AnketFormData = z.infer<typeof AnketSchema>
