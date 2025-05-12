'use client'

import { domAnimation, LazyMotion, m } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface FadeInUpProps {
	children: ReactNode
	className?: string
}

export default function FadeInUp({ children, className = '' }: FadeInUpProps) {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(entry.target)
				}
			},
			{ threshold: 0.45 }
		)

		if (ref.current) observer.observe(ref.current)

		return () => {
			if (ref.current) observer.unobserve(ref.current)
		}
	}, [])

	return (
		<LazyMotion features={domAnimation}>
			<div ref={ref} className={className}>
				<m.div
					initial={{ opacity: 0, y: 24 }}
					animate={isVisible ? { opacity: 1, y: 0 } : {}}
					transition={{
						duration: 0.45,
						ease: [0.16, 0.77, 0.47, 0.97],
					}}
				>
					{children}
				</m.div>
			</div>
		</LazyMotion>
	)
}
