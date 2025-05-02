import LoginForm from '@/components/ui/login-form/login-form'
import styles from './login.module.css'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Login() {
  return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper_inner}>
				<LoginForm />
			</div>
		</div>
	)
}