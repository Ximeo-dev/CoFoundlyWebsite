'use client'

import * as React from 'react'
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { Button } from '../shadcn/button'
import { Calendar } from '../shadcn/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn/select'
import { ru } from 'date-fns/locale'

interface IDatePicker {
	startYear?: number
	endYear?: number
	value?: Date | undefined
	onChange?: (date: Date | undefined) => void
}

export function DatePicker({
	startYear = getYear(new Date()) - 60,
	endYear = getYear(new Date()),
	value,
	onChange,
}: IDatePicker) {
	const [date, setDate] = React.useState<Date>(new Date())
	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  const handleMonthChange = (month: string) => {
		if (!value) {
			const newDate = setMonth(new Date(), months.indexOf(month))
			onChange?.(newDate)
		} else {
			const newDate = setMonth(value, months.indexOf(month))
			onChange?.(newDate)
		}
	}

	const handleYearChange = (year: string) => {
		if (!value) {
			const newDate = setYear(new Date(), parseInt(year))
			onChange?.(newDate)
		} else {
			const newDate = setYear(value, parseInt(year))
			onChange?.(newDate)
		}
	}

	const handleSelect = (selectDate: Date | undefined) => {
		onChange?.(selectDate)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[250px] justify-start text-left font-normal',
						!value && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{value ? (
						format(value, 'dd MMMM yyyy', { locale: ru })
					) : (
						<span>Выберите дату рождения</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<div className='flex justify-between p-2'>
					<Select
						onValueChange={handleMonthChange}
						value={value ? months[getMonth(value)] : undefined}
					>
						<SelectTrigger className='w-[110px]'>
							<SelectValue placeholder='Месяц' />
						</SelectTrigger>
						<SelectContent>
							{months.map(month => (
								<SelectItem key={month} value={month}>
									{month}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						onValueChange={handleYearChange}
						value={value ? getYear(value).toString() : undefined}
					>
						<SelectTrigger className='w-[110px]'>
							<SelectValue placeholder='Год' />
						</SelectTrigger>
						<SelectContent>
							{years.map(year => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode='single'
					selected={value}
					onSelect={handleSelect}
					initialFocus
					month={value}
					onMonthChange={date => {
						if (date) onChange?.(date)
					}}
					locale={ru}
				/>
			</PopoverContent>
		</Popover>
	)
}
