'use client'

import Modal from '../modal/modal'

interface ITwoFa {
	isOpen: boolean
	onClose: () => void
}

export default function TwoFA({ isOpen, onClose }: ITwoFa) {
  return (
		<Modal isOpen={isOpen} onClose={onClose} className='p-6'>
			<h2 className='text-xl'>Подтвердите действие в{' '}</h2>
			<a
				className='transition-all duration-300 border-b border-dashed border-b-foreground dark:text-sky-100 dark:hover:text-white'
				href='https://t.me/CoFoundlyBot'
				target='_blank'
			>
				@CoFoundlyBot
			</a>
		</Modal>
	)
}