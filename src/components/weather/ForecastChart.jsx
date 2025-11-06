import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';

/**
 * Forecast Chart Component with Recharts
 */
export function ForecastChart({ forecast }) {
  // Handle undefined or empty data
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p>No chart data available</p>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = forecast.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    high: day.temperature.max,
    mean: day.temperature.mean,
    low: day.temperature.min,
    confidence: day.confidence,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold mb-2 text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {Math.round(entry.value)}°C
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Temperature Forecast</h3>
        <p className="text-xs sm:text-sm text-gray-400">
          7-day temperature trends with confidence intervals
        </p>
      </div>
      
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300} className="sm:hidden">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: '#888' }}
              stroke="#888"
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#888' }}
              stroke="#888"
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="high"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorHigh)"
              name="High"
            />
            <Line
              type="monotone"
              dataKey="mean"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Average"
            />
            <Area
              type="monotone"
              dataKey="low"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorLow)"
              name="Low"
            />
          </AreaChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400} className="hidden sm:block">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#888' }}
              stroke="#888"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#888' }}
              stroke="#888"
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#888' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Area
              type="monotone"
              dataKey="high"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorHigh)"
              name="High"
            />
            <Line
              type="monotone"
              dataKey="mean"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Average"
            />
            <Area
              type="monotone"
              dataKey="low"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorLow)"
              name="Low"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
