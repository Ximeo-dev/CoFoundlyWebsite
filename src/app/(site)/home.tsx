'use client'

import Badge from '@/components/ui/badge/badge'
import { Button } from '@/components/ui/shadcn/button'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './home-page.module.scss'
import * as motion from 'motion/react-client'
import { slideUp } from '@/lib/motion-variants'

export default function Home() {
	return (
		<>
			<TextAnimate animation='slideUp' className={styles.title}>
				{PROJECT_NAME}
			</TextAnimate>
			<div className={styles.text_block}>
				<TextAnimate animation='slideUp' className={styles.sub_text}>
					Создавай
				</TextAnimate>
				<Badge>Вместе</Badge>
				<TextAnimate by='word' animation='slideUp' className={styles.sub_text}>
					— достигай быстрее
				</TextAnimate>
			</div>
			<motion.div variants={slideUp} initial='hidden' animate='visible' className={styles.btn_block}>
				<Button size={'lg'} className={styles.main_btn}>
					Начать
				</Button>
			</motion.div>
			<div className={styles.sec_text_block}>
				<TextAnimate
					by='word'
					animation='slideRight'
					className={styles.sec_text}
				>
					Меняем правила игры для стартаперов по всему миру
				</TextAnimate>
			</div>
		</>
	)
}
