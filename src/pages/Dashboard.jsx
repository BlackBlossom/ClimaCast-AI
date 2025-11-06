import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LocationSearch } from '../components/dashboard/LocationSearch';
import { WeatherCard } from '../components/weather/WeatherCard';
import { ForecastChart } from '../components/weather/ForecastChart';
import { ExtremeWeatherAlerts } from '../components/weather/ExtremeWeatherAlert';
import { WeatherCardSkeleton, ChartSkeleton, Alert } from '../components/ui';
import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';

/**
 * Main Dashboard Page Component
 */
export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.6139,
    lon: 77.2090,
    name: 'Delhi'
  });

  const { 
    forecast, 
    extremeWeather, 
    loading, 
    error, 
    fetchForecast, 
    fetchExtremeWeather 
  } = useWeather();

  useEffect(() => {
    if (selectedLocation.lat && selectedLocation.lon) {
      fetchForecast(selectedLocation.lat, selectedLocation.lon, 7);
      fetchExtremeWeather(selectedLocation.lat, selectedLocation.lon);
    }
  }, [selectedLocation, fetchForecast, fetchExtremeWeather]);

  const handleLocationSelect = (lat, lon, name) => {
    setSelectedLocation({ lat, lon, name });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ClimaCast AI</title>
      </Helmet>

      <div className="min-h-screen bg-gray-950 relative pt-20 sm:pt-24">
        {/* Fixed background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-climate-500/10 rounded-full blur-3xl animate-blob"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8 lg:mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Weather Dashboard
                </h1>
                <p className="text-base sm:text-lg text-gray-400">
                  AI-Powered 7-Day Climate Predictions
                </p>
              </div>

              {selectedLocation && (
                <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl sm:rounded-2xl">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-climate-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Current Location</p>
                    <p className="text-base sm:text-lg font-semibold text-white">{selectedLocation.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Location Search Card */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <LocationSearch 
                onLocationSelect={handleLocationSelect} 
                currentLocation={selectedLocation}
              />
            </div>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 sm:mb-8"
            >
              <Alert variant="destructive" title="Connection Error">
                {error}. Please check if your backend server is running on http://localhost:5000
              </Alert>
            </motion.div>
          )}

          {/* Extreme Weather Alerts */}
          {!loading && extremeWeather && extremeWeather.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <ExtremeWeatherAlerts alerts={extremeWeather} />
            </motion.div>
          )}

          {/* 7-Day Forecast Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                7-Day Forecast
              </h2>
              {!loading && forecast && forecast.length > 0 && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Live Data</span>
                  <span className="sm:hidden">Live</span>
                </div>
              )}
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {[...Array(7)].map((_, i) => (
                  <WeatherCardSkeleton key={i} />
                ))}
              </div>
            ) : forecast && forecast.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {forecast.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <WeatherCard day={day} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-warning-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Weather Data</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                    Unable to fetch forecast data. This might be because:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-500 space-y-2 mb-4 sm:mb-6 text-left max-w-md mx-auto">
                    <li>• Backend server is not running (check http://localhost:5000)</li>
                    <li>• API connection failed</li>
                    <li>• Selected location has no data available</li>
                  </ul>
                  <button 
                    onClick={() => fetchForecast(selectedLocation.lat, selectedLocation.lon, 7)}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-climate-500 hover:bg-climate-600 text-white rounded-xl text-sm sm:text-base font-semibold transition-colors"
                  >
                    Retry Loading Data
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Temperature Trend Chart */}
          {!loading && forecast && forecast.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                Temperature Trend Analysis
              </h2>
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <ForecastChart forecast={forecast} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
