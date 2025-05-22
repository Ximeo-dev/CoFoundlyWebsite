import { useCallback } from 'react'

export const useSound = (url: string) => {
	const play = useCallback(() => {
		const audio = new Audio(url)
		audio.play().catch(e => {
			console.warn('Audio play was prevented:', e)
		})
	}, [url])

	return play
}
