import { Alert } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Extreme Weather Alerts Component
 */
export function ExtremeWeatherAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getAlertVariant = (severity) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <span>⚠️</span> Weather Alerts
      </h3>
      
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={`${alert.date}-${alert.type}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Alert
              variant={getAlertVariant(alert.severity)}
              title={`Day ${alert.day} - ${alert.date}`}
              description={
                <div>
                  <p>{alert.description}</p>
                  <p className="mt-2 text-xs">
                    <strong>Recommendation:</strong> {alert.recommendation}
                  </p>
                </div>
              }
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
