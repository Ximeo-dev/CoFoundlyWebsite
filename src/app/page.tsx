import AnketPage from './(auth)/components/user-anket/anket-page'
import AuthLayout from './(auth)/layout'

export default function RootPage() {
	return (
		<AuthLayout>
			<AnketPage />
		</AuthLayout>
	)
}
