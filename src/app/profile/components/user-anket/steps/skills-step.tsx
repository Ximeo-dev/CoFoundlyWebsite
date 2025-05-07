'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SkillsModal from './skills-modal'
import { useQuery } from '@tanstack/react-query'
import { skillsService } from '@/services/skills.service'
import { ISkill } from '@/types/skills.types'

export default function SkillsStep() {
  const {
    watch,
    formState: { errors },
  } = useFormContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const skills = watch('skills', []) as string[] // skills хранит массив id

  // Загружаем все скиллы для сопоставления id с name
  const { data: allSkills } = useQuery({
    queryKey: ['get skills'],
    queryFn: () => skillsService.getSkills(500),
  })

  // Преобразуем id в name для отображения
  const skillNames = skills
    .map((skillId) => {
      const skill = allSkills?.find((s: ISkill) => s.id === skillId)
      return skill?.name
    })
    .filter(Boolean)
    .join(', ')

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5'>
          Ваши навыки
        </h3>
        <p className='text-sm text-gray-500 dark:text-neutral-500 mb-6'>
          Выберите навыки, которые соответствуют вашей специализации
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='w-full px-4 py-3 rounded-lg text-left border text-gray-900 dark:text-gray-100 hover:border-black/40 dark:hover:border-neutral-700 focus-within:border-black/40 dark:focus-within:border-neutral-700 bg-transparent selection:bg-primary dark:bg-input/30 transition-colors duration-300 cursor-pointer'
        >
          {skills.length > 0 ? skillNames : 'Нажмите для выбора навыков...'}
        </button>
        {errors.skills && (
          <p className='text-sm text-red-600 dark:text-red-500'>
            {errors.skills.message as string}
          </p>
        )}
      </div>

      <SkillsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}