import axios from 'axios';

// Your backend URL - update this after deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for model inference
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      throw {
        message: error.response.data.error || 'Server error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      throw {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    } else {
      // Something else happened
      throw {
        message: error.message || 'An unexpected error occurred',
        status: -1,
      };
    }
  }
);

// API methods
export const weatherAPI = {
  /**
   * Generate weather forecast using Prithvi model
   */
  getForecast: async (latitude, longitude, days = 7) => {
    return api.post('/predictions/prithvi/forecast', {
      latitude,
      longitude,
      days,
    });
  },

  /**
   * Detect extreme weather events
   */
  getExtremeWeather: async (latitude, longitude) => {
    return api.get('/predictions/prithvi/extreme-weather', {
      params: { latitude, longitude },
    });
  },

  /**
   * Get model information
   */
  getModelInfo: async () => {
    return api.get('/predictions/prithvi/info');
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    return api.get('/');
  },
};

export default api;
