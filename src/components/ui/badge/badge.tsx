import { ReactNode } from 'react'
import styles from './badge.module.css'
import * as motion from 'motion/react-client'
import { slideUp } from '@/lib/motion-variants'

export default function Badge({ children }: { children: ReactNode }) {
  return <motion.div variants={slideUp} initial='hidden' animate='visible' className={styles.badge}>{children}</motion.div>
}