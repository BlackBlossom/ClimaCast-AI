import { useState, useCallback } from 'react';
import { weatherAPI } from '../services/api';

/**
 * Custom hook for weather data fetching
 * Manages loading, error, and data states
 */
export function useWeather() {
  const [forecast, setForecast] = useState(null);
  const [extremeWeather, setExtremeWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = useCallback(async (latitude, longitude, days = 7) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherAPI.getForecast(latitude, longitude, days);
      console.log('📊 Forecast data received:', data);
      
      // Extract the forecast array from the response
      if (data && data.forecast && Array.isArray(data.forecast)) {
        console.log('📊 First forecast item structure:', data.forecast[0]);
        setForecast(data.forecast);
        return data.forecast;
      } else {
        console.error('⚠️ Invalid forecast data structure:', data);
        setForecast([]);
        return [];
      }
    } catch (err) {
      setError(err.message);
      setForecast([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchExtremeWeather = useCallback(async (latitude, longitude) => {
    try {
      const data = await weatherAPI.getExtremeWeather(latitude, longitude);
      console.log('⚡ Extreme weather data received:', data);
      
      // Extract the extremeEvents array from the response
      if (data && data.extremeEvents && Array.isArray(data.extremeEvents)) {
        setExtremeWeather(data.extremeEvents);
        return data.extremeEvents;
      } else {
        setExtremeWeather([]);
        return [];
      }
    } catch (err) {
      console.error('Extreme weather fetch error:', err);
      setExtremeWeather([]);
      return [];
    }
  }, []);

  const reset = useCallback(() => {
    setForecast(null);
    setExtremeWeather(null);
    setError(null);
  }, []);

  return {
    forecast,
    extremeWeather,
    loading,
    error,
    fetchForecast,
    fetchExtremeWeather,
    reset,
  };
}
