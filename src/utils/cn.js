import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes intelligently
 * Handles conflicts and removes duplicates
 * 
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 * 
 * @example
 * cn('text-red-500', 'text-blue-500') // → 'text-blue-500' (last wins)
 * cn('base-class', condition && 'conditional-class')
 * cn(['class1', 'class2'], 'class3')
 * cn({ 'active': isActive, 'disabled': isDisabled })
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
