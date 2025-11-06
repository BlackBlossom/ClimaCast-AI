import { cn } from '../../utils/cn';

/**
 * Loading skeleton component
 * Shows placeholder while data is loading
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  );
}

/**
 * Weather card skeleton for consistent loading state
 */
export function WeatherCardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
}

/**
 * Chart skeleton
 */
export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-64 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

/**
 * Loading Spinner Component
 */
export function LoadingSpinner({ size = 'default' }) {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={cn(
        sizes[size],
        'border-4 border-climate-200 border-t-climate-600 rounded-full animate-spin'
      )} />
    </div>
  );
}
