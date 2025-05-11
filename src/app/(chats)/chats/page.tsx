import type { Metadata } from 'next'
import Chat from '../components/chats/chat/chat'

export const metadata: Metadata = {
  title: 'Чаты',
}

export default function ChatsPage({ params }: { params: { id: string } }) {
  return (
		<Chat id={params.id} />
	)
}
