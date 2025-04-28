import type { Metadata } from 'next'
import Confirm from './components/confirm'

export const metadata: Metadata = {
	title: 'Новый пароль',
}

export default function ConfirmPage() {
	return <Confirm />
}
