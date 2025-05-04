'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { IAnketRequest } from '@/types/anket.types'
import { AnketFormData, AnketSchema } from '@/zod/anket.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquareArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { anketService } from '@/services/anket.service'
import Avatar from '../../profile-info/avatar'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import SkillsModal from '../steps/skills-modal'
import { Button } from '@/components/ui/shadcn/button'
import styles from './edit-anket.module.css'
import { cn } from '@/lib/utils'

export default function EditAnket({
	anket,
	onCancel,
	onUpdated,
}: {
	anket: any
	onCancel: () => void
	onUpdated: (updated: any) => void
}) {
	const { user } = useAuth()
	const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)

	const methods = useForm<any>({
		defaultValues: {
			job: anket?.job || '',
			bio: anket?.bio || '',
			skills: anket?.skills || [],
			portfolio: anket?.portfolio ? [anket.portfolio] : [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		resolver: zodResolver(AnketSchema),
		mode: 'onChange',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const skills = methods.watch('skills')

	const handleSubmit = async (data: IAnketRequest) => {
		setIsSubmitting(true)
		try {
			const response = await anketService.editAnket(data)
			toast.success('Анкета обновлена')
			onUpdated(response)
		} catch (e) {
			toast.error('Ошибка при обновлении анкеты')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className={cn(styles.edit_top, 'border-b border-border')}>
					<button
						type='button'
						onClick={onCancel}
						className={styles.cancel_btn}
					>
						<SquareArrowLeft className='text-[#656565] hover:text-[#828282] transition-colors duration-300 w-6 h-6' />
					</button>
					<h2 className={styles.edit_title}>Редактирование анкеты</h2>
				</div>

				<div className={styles.edit_block}>
					<div className={cn(styles.edit_left, 'border-r border-r-border')}>
						<div className={styles.edit_inner}>
							<Avatar size={512} editable />
							<div className={styles.personal_data}>
								<h1 className={styles.personal_data_text}>{user?.name}</h1>
								<h1 className={styles.personal_data_text}>{user?.age}</h1>
							</div>
						</div>
					</div>

					<div className={styles.edit_right}>
						<h2 className={styles.edit_right_title}>Информация в анкете</h2>
						<div className={styles.edit_right_block}>
							<div>
								<p className='text-gray-500 dark:text-neutral-500'>
									Род деятельности
								</p>
								<Input {...methods.register('job')} className='text-lg mt-1' />
							</div>

							<div>
								<p className='text-gray-500 dark:text-neutral-500'>О себе</p>
								<Textarea
									{...methods.register('bio')}
									className='mt-1'
									placeholder='Расскажите о себе'
								/>
							</div>

							<div>
								<p className='text-gray-500 dark:text-neutral-500'>Навыки</p>
								<div className={styles.edit_skills}>
									<button
										type='button'
										onClick={() => setIsSkillsModalOpen(true)}
										className='w-full px-4 py-3 rounded-lg text-left border dark:bg-input/30 border-border hover:border-[#999999] dark:hover:bg-[#171717] dark:hover:border-[#444444] transition-colors duration-300 cursor-pointer text-muted-foreground text-sm'
									>
										{skills.length > 0
											? skills.join(', ')
											: 'Нажмите для выбора навыков...'}
									</button>
									{methods.formState.errors.skills && (
										<p className='text-sm text-red-500'>
											{methods.formState.errors.skills.message as string}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.edit_btn_block}>
					<Button
						type='submit'
						disabled={isSubmitting}
						size={'lg'}
						className={styles.edit_btn}
					>
						{isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
					</Button>
				</div>

				<SkillsModal
					isOpen={isSkillsModalOpen}
					onClose={() => setIsSkillsModalOpen(false)}
				/>
			</form>
		</FormProvider>
	)
}
