import RegisterForm from '@/components/ui/register-form/register-form'
import styles from './register.module.css'

export default function Register() {
  return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper_inner}>
				<RegisterForm />
			</div>
		</div>
	)
}