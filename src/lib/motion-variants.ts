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
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      mass: 0.8
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, x: -7 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
}

export const dropdownMobileVariants = {
	hidden: {
		opacity: 0,
		y: 15,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			when: 'beforeChildren',
			staggerChildren: 0.08,
		},
	},
}

export const childVariant = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
		},
	},
}
