import { Card, CardHeader, CardTitle, CardContent, Badge } from '../ui';
import { TemperatureDisplay } from './TemperatureDisplay';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Individual Weather Card Component
 */
export function WeatherCard({ day, index }) {
  const getWeatherIcon = (code) => {
    if (code >= 60 && code <= 65) return CloudRain;
    if (code >= 70 && code <= 75) return CloudSnow;
    if (code >= 1 && code <= 3) return Cloud;
    if (code === 0) return Sun;
    return Cloud;
  };

  const WeatherIcon = getWeatherIcon(day.weatherCode);
  
  // Format date
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Get confidence color
  const getConfidenceVariant = (confidence) => {
    if (confidence >= 95) return 'success';
    if (confidence >= 85) return 'primary';
    if (confidence >= 75) return 'warning';
    return 'danger';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="text-center hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">{dayName}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">{dateStr}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Weather Icon */}
          <div className="flex justify-center">
            <WeatherIcon className="w-12 h-12 text-climate-600 dark:text-climate-400" />
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <TemperatureDisplay 
              temp={day.temperature.mean} 
              label="Average"
            />
            
            <div className="flex justify-between text-sm px-4">
              <span className="text-gray-600 dark:text-gray-400">
                H: {Math.round(day.temperature.max)}°
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                L: {Math.round(day.temperature.min)}°
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 text-sm">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <span className="dark:text-gray-300">{day.precipitation.probability}%</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-gray-500" />
              <span className="dark:text-gray-300">{Math.round(day.wind.maxSpeed)} km/h</span>
            </div>
          </div>

          {/* Confidence Badge */}
          <div className="pt-2">
            <Badge variant={getConfidenceVariant(day.confidence)}>
              {day.confidence}% Confidence
            </Badge>
          </div>

          {/* Pattern Badge */}
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {day.atmosphericPattern.replace(/_/g, ' ')}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
