import { Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Temperature Display Component with color-coded indicators
 */
export function TemperatureDisplay({ temp, label, className }) {
  // Color based on temperature
  const getTempColor = (temperature) => {
    if (temperature >= 35) return 'text-red-600 dark:text-red-400';
    if (temperature >= 25) return 'text-orange-500 dark:text-orange-400';
    if (temperature >= 15) return 'text-yellow-500 dark:text-yellow-400';
    if (temperature >= 5) return 'text-blue-500 dark:text-blue-400';
    return 'text-blue-700 dark:text-blue-300';
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center gap-2">
        <Thermometer className={cn('w-5 h-5', getTempColor(temp))} />
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn('text-4xl font-bold', getTempColor(temp))}
        >
          {Math.round(temp)}°C
        </motion.span>
      </div>
      {label && (
        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
