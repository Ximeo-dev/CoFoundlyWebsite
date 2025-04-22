import { Metadata } from 'next'
import Recovery from './components/recovery'
import ContainerWrapper from '@/components/layout/container/container-wrapper'

export const metadata: Metadata = {
	title: 'Восстановление пароля ',
}

export default function RecoveryPage() {
	return <ContainerWrapper>
		<Recovery />
	</ContainerWrapper>
}
