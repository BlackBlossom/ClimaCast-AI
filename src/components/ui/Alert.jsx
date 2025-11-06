import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

/**
 * Alert component for notifications and warnings
 * Perfect for extreme weather alerts
 */
export function Alert({ 
  variant = 'info', 
  title, 
  description, 
  className,
  onClose 
}) {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-900 dark:text-blue-100',
      Icon: Info,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      text: 'text-yellow-900 dark:text-yellow-100',
      Icon: AlertTriangle,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      text: 'text-green-900 dark:text-green-100',
      Icon: CheckCircle,
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      text: 'text-red-900 dark:text-red-100',
      Icon: XCircle,
    },
  };

  const config = variants[variant];
  const Icon = config.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        'rounded-lg border p-4 flex gap-3',
        config.bg,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', config.icon)} />
      <div className="flex-1">
        {title && (
          <h4 className={cn('font-semibold mb-1', config.text)}>
            {title}
          </h4>
        )}
        {description && (
          <div className={cn('text-sm', config.text)}>
            {description}
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn('shrink-0', config.icon, 'hover:opacity-70')}
        >
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}

/**
 * Badge component for labels and tags
 */
export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-climate-100 text-climate-800 dark:bg-climate-900 dark:text-climate-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
