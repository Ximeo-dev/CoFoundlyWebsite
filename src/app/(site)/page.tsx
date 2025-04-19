'use client'

import ContainerWrapper from '@/components/layout/container/container-wrapper'
import Badge from '@/components/ui/badge/badge'
import { Button } from '@/components/ui/shadcn/button'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './home-page.module.scss'

export default function HomePage() {
	return (
		<ContainerWrapper>
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
			<div className={styles.btn_block}>
				<Button size={'lg'} className={styles.main_btn}>
					Начать
				</Button>
			</div>
			<div className={styles.sec_text_block}>
				<TextAnimate by='word' animation='slideRight' className={styles.sec_text}>
					Меняем правила игры для стартаперов по всему миру
				</TextAnimate>
			</div>
		</ContainerWrapper>
	)
}
