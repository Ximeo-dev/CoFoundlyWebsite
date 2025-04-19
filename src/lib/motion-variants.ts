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
			duration: 0.4,
			ease: 'easeInOut',
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