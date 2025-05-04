'use client'

import Badge from '@/components/ui/badge/badge'
import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './home-page.module.css'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'
import { CARD, ICard } from './card.data'
import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'

export default function Home() {
	return (
		<>
			<FadeInUp className={styles.title}>
				{PROJECT_NAME}
			</FadeInUp>
			<div className={styles.text_block}>
				<FadeInUp
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					Создавай
				</FadeInUp>
				<Badge>Вместе</Badge>
				<FadeInUp
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					— достигай быстрее
				</FadeInUp>
			</div>
			<div className={styles.sec_text_block}>
				<FadeInUp className={styles.sec_text}>
					Меняем правила игры для стартаперов по всему миру
				</FadeInUp>
			</div>
			<div className={styles.card_block}>
				{CARD.map((item: ICard, index: number) => (
					<article
						key={item.id}
						className={cn(
							styles.card_inner,
							'border bg-background border-border hover:border-[#999999] dark:hover:bg-[#171717] dark:hover:border-[#444444] transition-colors duration-300'
						)}
					>
						<FadeInUp className={styles.title}>
							{item.title}
						</FadeInUp>
						<div className={styles.icon_block}>
							<item.icon className={styles.icon} />
						</div>
						<FadeInUp className={styles.desc}>
							{item.desc}
						</FadeInUp>
					</article>
				))}
			</div>
		</>
	)
}
