import { ReactNode } from 'react'
import styles from './badge.module.scss'

export default function Badge({ children }: { children: ReactNode }) {
  return <div className={styles.badge}>{children}</div>
}