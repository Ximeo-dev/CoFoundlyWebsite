'use client'

import { cn } from '@/lib/utils'
import styles from './profile-info.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Spinner from '@/components/ui/spinner/spinner'

interface IAvatarUploader {
	size: 64 | 128 | 512
	editable?: boolean
	className?: string
}

export default function Avatar({ size, editable = false, className }: IAvatarUploader) {
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const { user, avatarVersion, setAvatarVersion } = useAuth()
	
	const { mutate, isPending } = useMutation({
		mutationKey: ['user-avatar'],
		mutationFn: (file: File) => userService.uploadAvatar(file),
		onSuccess: () => {
			setAvatarVersion(Date.now())
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
			if (file.size > 2 * 1024 * 1024) {
				toast.error('Размер файла не должен превышать 2 МБ')
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

	const avatarUrl = `/images/avatar/${user?.id}/${size}?v=${avatarVersion}`


	return (
		<div className={cn(className, 'relative')}>
			{user?.avatarUrl ? (
				<Image
					src={`/images/avatar/${user.id}/${size}`}
					alt='avatar'
					width={size}
					height={size}
					className={cn(
						size === 64
							? 'rounded-full object-cover w-10 h-10 lg:w-12 lg:h-12'
							: size === 128
							? 'object-cover w-36 h-36 rounded-[15px]'
							: size === 512
							? 'object-cover w-72 h-52 md:w-90 md:h-64 rounded-[15px]'
							: styles.avatar,
						isPending ? 'opacity-50' : 'opacity-100'
					)}
				/>
			) : (
				<span
					className={cn(
						'flex items-center justify-center rounded-[30px] bg-background border text-black dark:text-white uppercase select-none',
						size === 64
							? 'rounded-full object-cover w-10 h-10 lg:w-12 lg:h-12'
							: size === 128
							? 'object-cover w-44 h-44 rounded-[15px]'
							: size === 512
							? 'object-cover w-72 h-52 md:w-90 md:h-64 rounded-[30px]'
							: styles.avatar,
						isPending ? 'opacity-50' : 'opacity-100'
					)}
					style={{
						fontSize: size ? size / 3 : 24,
					}}
				>
					{user?.name?.[0]}
				</span>
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