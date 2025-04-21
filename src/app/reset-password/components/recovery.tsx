import RecoveryForm from './recovery-form'
import styles from './recovery.module.css'

export default function Login() {
  return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper_inner}>
				<RecoveryForm />
			</div>
		</div>
	)
}