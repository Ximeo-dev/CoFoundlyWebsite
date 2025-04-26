'use client'

import Badge from '@/components/ui/badge/badge'
import { Button } from '@/components/ui/shadcn/button'
import { TextAnimate } from '@/components/ui/shadcn/text-animate'
import { PROJECT_NAME } from '@/constants/seo.constants'
import styles from './home-page.module.css'
import * as motion from 'motion/react-client'
import { slideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'
import { CARD, ICard } from './card.data'

export default function Home() {
	return (
		<>
			<TextAnimate animation='slideUp' className={styles.title}>
				{PROJECT_NAME}
			</TextAnimate>
			<div className={styles.text_block}>
				<TextAnimate
					animation='slideUp'
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					Создавай
				</TextAnimate>
				<Badge>Вместе</Badge>
				<TextAnimate
					by='word'
					animation='slideUp'
					className={cn(styles.sub_text, 'dark:text-[#929191] text-[#696363]')}
				>
					— достигай быстрее
				</TextAnimate>
			</div>
			<motion.div
				variants={slideUp}
				initial='hidden'
				animate='visible'
				className={styles.btn_block}
			>
				<button
					className={cn(
						styles.main_btn,
						'bg-black text-white dark:bg-white dark:text-black shadow-[-5px_0px_50px_-13px_#805ad5,5px_0px_50px_-13px_#81e6d9]'
					)}
				>
					Начать
				</button>
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
			<div className={styles.card_block}>
				{CARD.map((item: ICard, index: number) => (
					<article
						key={item.id}
						className={cn(
							styles.card_inner,
							'bg-white border border-[#D9D7D7] dark:bg-[#151515] dark:border-[#3a3a3a] hover:border-[#999999] dark:hover:bg-[#171717] dark:hover:border-[#444444] transition-colors duration-300'
						)}
					>
						<TextAnimate animation='slideUp' className={styles.title}>
							{item.title}
						</TextAnimate>
						<div className={styles.icon_block}>
							<item.icon className={styles.icon} />
						</div>
						<TextAnimate animation='slideUp' className={styles.desc}>
							{item.desc}
						</TextAnimate>
					</article>
				))}
			</div>
		</>
	)
}
