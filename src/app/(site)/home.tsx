'use client'

import Badge from '@/components/ui/badge/badge'
import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './home-page.module.css'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'
import { CARD, ICard } from './card.data'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import FadeIn from 'react-fade-in'

export default function Home() {
	return (
		<LazyMotion features={domAnimation}>
			<FadeIn visible className={styles.title}>
				{PROJECT_NAME}
			</FadeIn>
			<div className={styles.text_block}>
				<FadeIn
					visible
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					Создавай
				</FadeIn>
				<Badge>Вместе</Badge>
				<FadeIn
					visible
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					— достигай быстрее
				</FadeIn>
			</div>
			<m.div
				variants={slideUp}
				initial='hidden'
				animate='visible'
				className={styles.btn_block}
			></m.div>
			<div className={styles.sec_text_block}>
				<FadeIn visible className={styles.sec_text}>
					Меняем правила игры для стартаперов по всему миру
				</FadeIn>
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
						<FadeIn visible className={styles.title}>
							{item.title}
						</FadeIn>
						<div className={styles.icon_block}>
							<item.icon className={styles.icon} />
						</div>
						<FadeIn visible className={styles.desc}>
							{item.desc}
						</FadeIn>
					</article>
				))}
			</div>
		</LazyMotion>
	)
}
