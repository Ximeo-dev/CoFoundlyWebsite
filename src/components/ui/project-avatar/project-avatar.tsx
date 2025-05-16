'use client'

import { cn } from '@/lib/utils'
import styles from './profile-info.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'
import Spinner from '@/components/ui/spinner/spinner'
import { API_URL } from '@/constants/api.constants'
import { anketService } from '@/services/anket.service'

interface IProjectAvatar {
	size: 64 | 128 | 512
	editable?: boolean
	className?: string
	projectId?: string
	projectName?: string
	avatarVersion?: number
	setAvatarVersion?: (version: number) => void
}

export default function ProjectAvatar({
	size,
	editable = false,
	className,
	projectId,
	projectName,
	avatarVersion,
	setAvatarVersion,
}: IProjectAvatar) {
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		setImageError(false)
	}, [projectId])

	const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
		mutationKey: ['project-avatar', projectId],
		mutationFn: (file: File) =>
			anketService.uploadAvatar(file),
		onSuccess: () => {
			if (setAvatarVersion) setAvatarVersion(Date.now())
			setImageError(false)
			queryClient.invalidateQueries({
				queryKey: ['getProjectById', projectId],
			})
			queryClient.invalidateQueries({
				queryKey: ['getProjects'],
			})
			toast.success('Логотип проекта обновлён')
		},
		onError: (error: any) => {
			setImageError(true)
			toast.error(
				error?.response?.data?.message || 'Ошибка при загрузке логотипа'
			)
		},
	})

	const { mutate: deleteAvatar, isPending: isDeleting } = useMutation({
		mutationKey: ['delete-project-avatar', projectId],
		mutationFn: () => anketService.deleteAvatar('project'),
		onSuccess: () => {
			if (setAvatarVersion) setAvatarVersion(Date.now())
			setImageError(true)
			queryClient.invalidateQueries({
				queryKey: ['getProjectById', projectId],
			})
			queryClient.invalidateQueries({
				queryKey: ['getProjects'],
			})
			toast.success('Логотип проекта удалён')
		},
		onError: (error: any) => {
			toast.error(
				error?.response?.data?.message || 'Ошибка при удалении логотипа'
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
			uploadAvatar(file)
		}
	}

	const handleClick = () => {
		if (!isUploading && !isDeleting) {
			inputRef.current?.click()
		}
	}

	const initialLetter = projectName?.charAt(0) || 'P'

	const avatarStyles = cn(
		size === 64
			? 'rounded-full w-8 h-8 object-cover'
			: size === 128
			? 'rounded-[15px] w-16 h-16 object-cover'
			: size === 512
			? 'rounded-[15px] w-32 h-32 object-cover'
			: 'rounded-full w-8 h-8 object-cover',
		isUploading || isDeleting ? 'opacity-50' : 'opacity-100',
		'flex items-center justify-center'
	)

	const avatarUrl = projectId
		? `${API_URL}/images/avatar/project/${projectId}/${size}?v=${
				avatarVersion || Date.now()
		  }`
		: null

	return (
		<div className={cn(className, 'relative')}>
			{imageError || !avatarUrl ? (
				<div
					className={cn(
						avatarStyles,
						'border border-border text-gray-800 dark:text-white text-sm font-semibold'
					)}
				>
					{initialLetter}
				</div>
			) : (
				<Image
					key={avatarUrl}
					src={avatarUrl}
					alt='project avatar'
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
						className='cursor-pointer absolute -bottom-2 right-2 flex items-center w-6 h-6 rounded-full bg-black/70 text-white text-[10px] font-medium backdrop-blur-sm hover:bg-black transition-all duration-200'
					>
						<Pencil size={12} />
					</button>
					<button
						type='button'
						onClick={() => deleteAvatar()}
						disabled={isUploading || isDeleting}
						className='cursor-pointer absolute -bottom-2 -right-2 flex items-center w-6 h-6 rounded-full bg-black/70 text-white text-[10px] font-medium backdrop-blur-sm hover:bg-black transition-all duration-200'
					>
						<Trash size={12} />
					</button>
				</>
			)}
		</div>
	)
}
