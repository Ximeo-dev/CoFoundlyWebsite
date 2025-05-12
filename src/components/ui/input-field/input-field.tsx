'use client';

import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from '../register-form/register-form.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  error?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export default function InputField({
  icon,
  rightIcon,
  onRightIconClick,
  error,
  className,
  onChange,
  placeholder,
  type = 'text',
  ...props
}: IInputField) {
  const tooltipVariants = {
    hidden: { opacity: 0, y: 5, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 5, scale: 0.95 },
  };

  return (
    <div className="relative">
      <label
        className={cn(
          styles.field,
          'flex items-center relative px-2 rounded-[15px] transition-colors duration-200 ease-linear mb-1 mt-5 bg-background border border-border focus-within:border focus-within:border-black dark:focus-within:border-white/70',
          error && 'border-red-500',
          className
        )}
      >
        {icon && (
          <div
            className={cn(
              styles.icon,
              'focus-within:text-black dark:focus-within:text-white/70 mr-3 text-[#585654] transition-colors duration-200 ease-linear'
            )}
          >
            {icon}
          </div>
        )}
        <input
          className="bg-transparent outline-none pr-2 py-2 placeholder:text-[#585654] w-full flex z-10"
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          {...props}
        />
        {error ? (
          ''
        ) : (
          rightIcon && (
            <div
              className="mr-3 text-[#585654] transition-colors duration-200 ease-linear cursor-pointer"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )
        )}
      </label>

      <AnimatePresence>
        {error && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-[-28px] left-0 flex items-center gap-1 z-30"
          >
            <div className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 shadow-[15px] relative">
              {error}
              <div className="absolute bottom-[-4px] left-4 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-red-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}