import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

/**
 * Modern card component with glassmorphism effect
 * Perfect for dashboard widgets and content containers
 */
const Card = forwardRef(({
  className,
  hover = true,
  glass = false,
  children,
  ...props
}, ref) => {

  const baseStyles = 'rounded-xl p-6 transition-all duration-300';
  const glassStyles = glass 
    ? 'bg-white/10 backdrop-blur-lg border border-white/20' 
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  return (
    <motion.div
      ref={ref}
      className={cn(
        baseStyles,
        glassStyles,
        hoverStyles,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

// Sub-components for better composition
const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-4', className)}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-bold text-gray-900 dark:text-white',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    {...props}
  >
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

// Export all components
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
