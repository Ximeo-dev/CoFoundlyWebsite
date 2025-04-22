import { Variants } from 'framer-motion'

export const slideUp: Variants = {
	hidden: {
		y: 30,
		opacity: 0,
	},
	visible: (custom: number = 0) => ({
		y: 0,
		opacity: 1,
		transition: {
			delay: custom * 0.15,
			duration: 0.3,
			ease: 'easeInOut',
		},
	}),
}

export const cardAnimation = {
	hidden: { opacity: 0, y: 50 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.15,
			duration: 0.6,
			ease: [0.19, 1, 0.22, 1],
		},
	}),
}

export const slideLeft: Variants = {
	hidden: {
		x: 40,
		opacity: 0,
	},
	visible: (custom: number = 0) => ({
		x: 0,
		opacity: 1,
		transition: {
			delay: custom * 0.15,
			duration: 0.4,
			ease: 'easeInOut',
		},
	}),
}

export const slideRight: Variants = {
  hidden: {
    x: -40,
    opacity: 0,
  },
  visible: (custom: number = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

export const dropdownVariants = {
	hidden: { opacity: 0, scale: 0, transformOrigin: 'top right' },
	visible: {
		opacity: 1,
		scale: 1,
		transformOrigin: 'top right',
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.08,
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		opacity: 0,
		scale: 0,
		transformOrigin: 'top right',
		transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
	},
}

export const itemVariants = {
	hidden: { opacity: 0, y: 5 },
	visible: { opacity: 1, y: 0 },
}