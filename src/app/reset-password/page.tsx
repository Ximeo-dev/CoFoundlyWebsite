import { Metadata } from 'next'
import Recovery from './components/recovery'

export const metadata: Metadata = {
	title: 'Восстановление пароля ',
}

export default function RecoveryPage() {
	return <Recovery />
}
