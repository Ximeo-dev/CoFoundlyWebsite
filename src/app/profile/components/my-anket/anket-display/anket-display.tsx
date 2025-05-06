'use client'

import { IAnket } from '@/types/anket.types'
import { calculateCompletion } from '@/utils/calculateCompletion'
import { useState } from 'react'
import ProgressBar from '../progress-bar/progress-bar'

export default function AnketDisplay({ anket }: { anket: IAnket }) {
  const percent = calculateCompletion(anket)

  return (
		<div className='space-y-4'>
			<ProgressBar percent={percent} />
			<div className='bg-muted p-4 rounded-xl'>
				<p>
					<strong>Имя:</strong> {anket.name || '—'}
				</p>
				<p>
					<strong>Дата рождения:</strong> {anket.birthDate || '—'}
				</p>
				<p>
					<strong>Биография:</strong> {anket.bio || '—'}
				</p>
				{/* Добавь остальные поля */}
			</div>
			<div className='flex gap-3'>
				<button className='btn'>Редактировать</button>
				{percent >= 60 && (
					<button className='btn'>Убрать / Опубликовать</button>
				)}
			</div>
		</div>
	)
}