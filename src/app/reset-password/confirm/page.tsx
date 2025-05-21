import type { Metadata } from 'next'
import Confirm from './components/confirm'
import ContainerWrapper from '@/components/layout/container/container-wrapper'

export const metadata: Metadata = {
	title: 'Новый пароль',
}

export default function ConfirmPage() {
	return (
		<ContainerWrapper>
			<Confirm />
		</ContainerWrapper>
	)
}
