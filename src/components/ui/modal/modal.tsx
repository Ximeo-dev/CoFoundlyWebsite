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
	onClose: () => void
	children?: React.ReactNode
	className?: string
}) {
	const modalRef = useRef<HTMLDivElement>(null)
	const isMouseDownInside = useRef(false)

	useEffect(() => {
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
				onClose()
			}
		}

		if (isOpen) {
			document.body.classList.add('overflow-hidden')
			document.addEventListener('mousedown', handleMouseDown)
			document.addEventListener('mouseup', handleMouseUp)
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		return () => {
			document.body.classList.remove('overflow-hidden')
			document.removeEventListener('mousedown', handleMouseDown)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<LazyMotion features={domAnimation}>
			<div className='bg-[rgba(0,0,0,0.7)] w-full h-screen flex items-center justify-center fixed inset-0 z-50 overflow-hidden'>
				<m.div
					ref={modalRef}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className={cn(
						'border border-border bg-background h-auto min-w-[300px] rounded-lg overflow-hidden',
						className
					)}
				>
					{children}
				</m.div>
			</div>
		</LazyMotion>
	)
}
