'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'

export default function Modal({
	isOpen,
	onClose,
	children,
	className,
}: {
	isOpen: boolean
	onClose: any
	children?: React.ReactNode
	header?: any
	className?: string
}) {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		return () => {
			document.body.classList.remove('overflow-hidden')
		}
	}, [isOpen])

	if (!isOpen) return null

	const modalRef = useRef<HTMLDivElement>(null)
	const isMouseDownInside = useRef(false)

	const handleClickOutside = (e: any) => {
		handleMouseUp(e)
	}

	const handleMouseDown = (e: MouseEvent) => {
		if (modalRef.current && modalRef.current.contains(e.target as Node)) {
			isMouseDownInside.current = true
		} else {
			isMouseDownInside.current = false
		}
	}

	const handleMouseUp = (e: MouseEvent) => {
		if (
			!isMouseDownInside.current &&
			modalRef.current &&
			!modalRef.current.contains(e.target as Node)
		) {
			onClose(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown)
		document.addEventListener('mouseup', handleMouseUp)

		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])

	return (
		<LazyMotion features={domAnimation}>
			<div
				onClick={handleClickOutside}
				className='bg-[rgba(0,0,0,0.7)] w-full h-screen flex items-center justify-center fixed inset-0 z-[20] overflow-hidden'
			>
				<m.div
					ref={modalRef}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className={cn(
						'bg-white border border-[#D9D7D7] dark:bg-[#151515] dark:border-[#3a3a3a] h-auto min-w-[300px] rounded-lg overflow-hidden',
						className
					)}
				>
					{children}
				</m.div>
			</div>
		</LazyMotion>
	)
}
