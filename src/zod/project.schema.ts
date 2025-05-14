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

export interface ProjectFormValues {
  name: string
  description: string
  industry: string | Industry
  jobs?: Array<string | any>
  skills?: Array<string | Skill>
  languages?: Array<string | Language>
}

export const ProjectFormSchema = z.object({
	name: z.string().min(1, 'Название обязательно'),
	description: z
		.string()
		.min(10, 'Должно быть более 10 символов')
		.max(256, 'Должно быть менее 256 символов'),
	industry: z
		.string(),
		// .max(1, 'Максимум можно выбрать 1 нишу')
	jobs: z.array(z.string()).optional(),
	skills: z
		.array(z.string())
		.max(20, 'Максимум можно выбрать 20 навыков')
		.optional(),
	languages: z
		.array(z.string())
		.max(10, 'Максимум можно выбрать 10 языков')
		.optional(),
})

export type ProjectFormType = z.infer<typeof ProjectFormSchema>
