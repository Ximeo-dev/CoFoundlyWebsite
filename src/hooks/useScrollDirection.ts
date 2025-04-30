import { useEffect, useState } from 'react'

export const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
	const [lastYScroll, setLastYScroll] = useState(0)
	const threshold = 5

	const handleScroll = () => {
		const currentScrollY = window.scrollY
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight

		if (currentScrollY < 0 || currentScrollY > maxScroll) return

		const diff = currentScrollY - lastYScroll

		if (Math.abs(diff) < threshold) return

		if (currentScrollY > lastYScroll) {
			setScrollDirection('down')
		} else {
			setScrollDirection('up')
		}
		setLastYScroll(currentScrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [lastYScroll])

	return scrollDirection
}
