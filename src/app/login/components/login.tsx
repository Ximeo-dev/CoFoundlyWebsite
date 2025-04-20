'use client'

import LoginForm from '@/components/ui/login-form/login-form'
import styles from './login.module.css'

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_inner}>
        <LoginForm />
      </div>
    </div>
  )
}