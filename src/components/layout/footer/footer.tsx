import ContainerWrapper from '../container/container-wrapper'
import FooterNav from './footer-nav'
import styles from './footer.module.css'

export default function Footer() {
  return (
		<ContainerWrapper>
			<footer
				className={styles.footer_block}
			>
				<FooterNav />
			</footer>
		</ContainerWrapper>
	)
}