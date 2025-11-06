import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Input component for forms and search
 */
const Input = forwardRef(({
  className,
  type = 'text',
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          'w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-white placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-climate-500',
          'transition-all duration-200',
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
