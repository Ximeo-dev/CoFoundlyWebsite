import { useEffect } from 'react'
import { useNotifications } from '@/hooks/notifications/useNotifications'
import { IParticipant } from '@/types/chat.types'

interface UseChatNotificationsProps {
	correspondent: IParticipant | undefined
}

export default function useChatNotifications ({
	correspondent,
}: UseChatNotificationsProps) {
	const { setActiveChatUserId, toggleSound } = useNotifications()

	useEffect(() => {
		if (correspondent?.userId) {
			setActiveChatUserId(correspondent.userId)
			toggleSound(false)
		}

		return () => {
			setActiveChatUserId(null)
			toggleSound(true)
		}
	}, [correspondent, setActiveChatUserId, toggleSound])
}
