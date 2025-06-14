'use client'

import { motion } from 'framer-motion'

export default function TypingDots () {
  return (
    <div className='flex items-center opacity-50'>
      <div className='flex space-x-1'>
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className='block w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-400'
            animate={{
              y: [0, -4, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 0,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className='ml-1 text-sm'>печатает</span>
    </div>
  )
}