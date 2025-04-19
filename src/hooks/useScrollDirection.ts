import { useEffect, useState } from 'react'

export const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
	const [lastYScroll, setLastYScroll] = useState(0)

	const handleScroll = () => {
		const currentScrollY = window.scrollY
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