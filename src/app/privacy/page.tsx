import FadeInUp from '@/components/ui/fade-on-view/fade-on-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
}

export default function PrivacyPage() {
  return (
		<main>
			<FadeInUp className='text-center text-3xl sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.3rem] 2xl:text-[3.7rem] text-center pt-14 sm:pt-[80px] md:pt-[120px] lg:pt-[110px] xl:pt-[160px] select-none'>
				Политика конфиденциальности
			</FadeInUp>
		</main>
	)
}
