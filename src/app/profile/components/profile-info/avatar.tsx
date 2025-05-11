'use client'

import { cn } from '@/lib/utils'
import styles from './profile-info.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Spinner from '@/components/ui/spinner/spinner'
import { anketService } from '@/services/anket.service'
import { API_URL } from '@/constants/api.constants'

interface IAvatarUploader {
	size: 64 | 128 | 512
	editable?: boolean
	className?: string
}

export default function Avatar({
	size,
	editable = false,
	className,
}: IAvatarUploader) {
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const { user, setAvatarVersion } = useAuth()
	const [imageError, setImageError] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationKey: ['user-avatar'],
		mutationFn: (file: File) => anketService.uploadAvatar(file),
		onSuccess: () => {
			setAvatarVersion(Date.now())
			setImageError(false)
			queryClient.invalidateQueries({
				queryKey: ['userProfile'],
			})
			toast.success('Аватар обновлён')
		},
		onError: (error: any) => {
			toast.error(
				error?.response?.data?.message || 'Ошибка при загрузке аватара'
			)
		},
	})

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
				toast.error('Только изображения форматов PNG, JPEG или WEBP')
				return
			}
			if (file.size > 3 * 1024 * 1024) {
				toast.error('Размер файла не должен превышать 3 МБ')
				return
			}
			mutate(file)
		}
	}

	const handleClick = () => {
		if (!isPending) {
			inputRef.current?.click()
		}
	}

	const initialLetter = 'U'

	const avatarStyles = cn(
		size === 64
			? 'rounded-full w-10 h-10 lg:w-12 lg:h-12 object-cover'
			: size === 128
			? 'w-36 h-36 rounded-[15px] object-cover'
			: size === 512
			? 'w-72 h-52 md:w-90 md:h-64 rounded-[15px] object-cover'
			: styles.avatar,
		isPending ? 'opacity-50' : 'opacity-100',
		'flex items-center justify-center'
	)

	return (
		<div className={cn(className, 'relative')}>
			{imageError || !user?.id ? (
				<div
					className={cn(
						avatarStyles,
						'bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white text-xl font-semibold'
					)}
				>
					{initialLetter}
				</div>
			) : (
				<Image
					src={`${API_URL}/images/avatar/${user?.id}/${size}`}
					alt='avatar'
					width={size}
					height={size}
					className={avatarStyles}
					onError={() => setImageError(true)}
					priority
				/>
			)}

			{isPending && (
				<div className='absolute inset-0 bg-[#111111] flex items-center justify-center z-10 rounded-[30px]'>
					<Spinner />
				</div>
			)}

			{editable && !isPending && (
				<>
					<input
						type='file'
						accept='image/png,image/jpeg,image/webp'
						ref={inputRef}
						onChange={handleFileChange}
						className='hidden'
					/>
					<button
						type='button'
						onClick={handleClick}
						disabled={isPending}
						className='absolute -bottom-3 right-0 md:-bottom-3 md:-right-8 flex items-center gap-1 px-2 py-1 md:px-2.5 md:py-1.5 rounded-[15px] bg-black/70 text-white text-[13px] font-medium backdrop-blur-sm hover:bg-black transition-all duration-200'
					>
						<Pencil size={14} /> Изменить
					</button>
				</>
			)}
		</div>
	)
}
