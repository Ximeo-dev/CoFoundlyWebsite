'use client'

import { Suspense } from 'react'
import ConfirmForm from './confirm-form'
import styles from './confirm.module.css'

export default function Confirm() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<div className={styles.wrapper}>
				<div className={styles.wrapper_inner}>
					<ConfirmForm />
				</div>
			</div>
		</Suspense>
	)
}
