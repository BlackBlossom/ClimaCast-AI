import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

/**
 * Modern button component with variants and animations
 * Inspired by Aceternity UI's interactive buttons
 */
const Button = forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  animated = true,
  children,
  disabled,
  ...props
}, ref) => {

  const variants = {
    default: 'bg-climate-600 text-white hover:bg-climate-700 border-climate-600',
    outline: 'border-2 border-climate-600 text-climate-600 hover:bg-climate-50 dark:hover:bg-climate-900/20',
    ghost: 'hover:bg-climate-50 dark:hover:bg-climate-900/20 text-climate-600 dark:text-climate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-red-600',
    success: 'bg-green-600 text-white hover:bg-green-700 border-green-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-climate-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const ButtonComponent = animated ? motion.button : 'button';

  const animationProps = animated ? {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
  } : {};

  return (
    <ButtonComponent
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...animationProps}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
});

Button.displayName = 'Button';

export default Button;
