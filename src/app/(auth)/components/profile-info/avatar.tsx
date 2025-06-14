'use client'

import { cn } from '@/lib/utils'
import styles from './profile-info.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Spinner from '@/components/ui/spinner/spinner'
import { anketService } from '@/services/anket.service'
import { API_URL } from '@/constants/api.constants'

interface IAvatarUploader {
	size: 32 | 64 | 128 | 512
	editable?: boolean
	className?: string
	id?: string
	name?: string
	hasAvatar?: boolean
	smallChatAvatar?: boolean
	bigChatAvatar?: boolean
	notificationAvatar?: boolean
	onFileSelect?: (file: File) => void
	tempAvatar?: string | null
}

export default function Avatar({
	size,
	editable = false,
	className,
	id,
	name,
	hasAvatar = false,
	smallChatAvatar = false,
	bigChatAvatar = false,
	notificationAvatar = false,
	onFileSelect,
	tempAvatar = null,
}: IAvatarUploader) {
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const { user, avatarVersion, setAvatarVersion } = useAuth()
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		setImageError(false)
	}, [id])

	const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
		mutationKey: ['user-avatar'],
		mutationFn: (file: File) => anketService.uploadAvatar(file),
		onSuccess: data => {
			setAvatarVersion(Date.now())
			setImageError(false)
			queryClient.invalidateQueries({
				queryKey: ['anket'],
			})
			toast.success('Аватар обновлён')
		},
		onError: (error: any) => {
			setImageError(true)
			toast.error(
				error?.response?.data?.message || 'Ошибка при загрузке аватара'
			)
		},
	})

	const { mutate: deleteAvatar, isPending: isDeleting } = useMutation({
		mutationKey: ['delete avatar'],
		mutationFn: () => anketService.deleteAvatar('user'),
		onSuccess: () => {
			setAvatarVersion(Date.now())
			setImageError(true)
			queryClient.invalidateQueries({
				queryKey: ['anket'],
			})
			toast.success('Аватар удалён')
		},
		onError: (error: any) => {
			toast.error(
				error?.response?.data?.message || 'Ошибка при удалении аватара'
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

			if (onFileSelect) {
				onFileSelect(file)
			} else {
				uploadAvatar(file)
			}
		}
	}

	const handleClick = () => {
		if (!isUploading && !isDeleting) {
			inputRef.current?.click()
		}
	}

	const initialLetter = name ? name.charAt(0) : user?.username.charAt(0) || ''
	const avatarStyles = cn(
		size === 64
			? `rounded-full object-cover ${
					smallChatAvatar ? 'w-8 h-8' : 'w-10 h-10 lg:w-12 lg:h-12'
			  }`
			: size === 32
			? 'rounded-full w-8 h-8 object-cover'
			: size === 128
			? `object-cover ${
					bigChatAvatar
						? 'w-20 h-20 rounded-full'
						: notificationAvatar
						? 'w-[70px] h-[70px] rounded-full'
						: 'w-36 h-36 rounded-[15px]'
			  }`
			: size === 512
			? 'w-72 h-52 md:w-90 md:h-64 rounded-[15px] object-cover'
			: styles.avatar,
		isUploading || isDeleting ? 'opacity-50' : 'opacity-100',
		'flex items-center justify-center'
	)

  const avatarUserId = id || user?.id
	const avatarUrl = tempAvatar
		? tempAvatar
		: hasAvatar && avatarUserId
		? `${API_URL}/images/avatar/user/${avatarUserId}/${size}?v=${
				avatarVersion || Date.now()
		  }`
		: null

	return (
		<div className={cn(className, 'relative')}>
			{imageError || !hasAvatar || !avatarUrl ? (
				<div
					className={cn(
						avatarStyles,
						'border border-border text-gray-800 dark:text-white text-xl font-semibold'
					)}
				>
					{initialLetter}
				</div>
			) : (
				<Image
					key={avatarUrl}
					src={avatarUrl}
					alt='avatar'
					width={size}
					height={size}
					className={avatarStyles}
					onError={() => setImageError(true)}
					priority
				/>
			)}

			{(isUploading || isDeleting) && (
				<div className='absolute inset-0 bg-[#111111] flex items-center justify-center z-10 rounded-[15px]'>
					<Spinner />
				</div>
			)}

			{editable && !isUploading && !isDeleting && (
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
						disabled={isUploading || isDeleting}
						className='cursor-pointer absolute -bottom-8 right-8 md:-bottom-2 md:right-7 flex items-center w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white text-[13px] font-medium backdrop-blur-sm hover:bg-black transition-all duration-200'
					>
						<Pencil size={16} />
					</button>
					<button
						type='button'
						onClick={() => deleteAvatar()}
						disabled={isUploading || isDeleting}
						className='cursor-pointer absolute -bottom-8 -right-1 md:-bottom-2 md:-right-2 flex items-center w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white text-[13px] font-medium backdrop-blur-sm hover:bg-black transition-all duration-200'
					>
						<Trash size={16} />
					</button>
				</>
			)}
		</div>
	)
}
