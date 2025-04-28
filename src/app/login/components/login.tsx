import LoginForm from '@/components/ui/login-form/login-form'
import styles from './login.module.css'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Login() {
  return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper_inner}>
				<div
					className={cn(
						styles.back_btn,
						'dark:bg-[#151515] bg-white border border-[#d9d7d7] dark:border-[#3a3a3a]'
					)}
				>
					<Link href='/'>
						<ArrowLeft className='size-6' />
					</Link>
				</div>
				<LoginForm />
			</div>
		</div>
	)
}