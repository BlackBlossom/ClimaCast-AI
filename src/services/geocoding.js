import axios from 'axios';

/**
 * Nominatim Geocoding Service (OpenStreetMap)
 * 100% Free, no API key required
 * 
 * IMPORTANT: Respects 1 request/second rate limit
 * Documentation: https://nominatim.org/release-docs/latest/api/Overview/
 */

// Rate limiting helper
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second in milliseconds

const waitForRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`⏳ Rate limiting: Waiting ${waitTime}ms before next request`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();
};

/**
 * Nominatim API Base Configuration
 */
const nominatimAPI = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 10000,
  headers: {
    'User-Agent': 'ClimaCast-AI/1.0 (Team Foresighters Hackathon Project)',
    'Accept-Language': 'en',
  },
});

/**
 * Geocoding API methods
 */
export const geocodingAPI = {
  /**
   * Search cities by name (Direct Geocoding)
   * Converts city name to coordinates
   * 
   * @param {string} query - City name to search
   * @param {number} limit - Max number of results (default: 5)
   * @returns {Promise<Array>} Array of location results
   */
  searchCities: async (query, limit = 5) => {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      // Respect rate limit
      await waitForRateLimit();

      console.log(`🔍 Searching for: "${query}"`);

      const response = await nominatimAPI.get('/search', {
        params: {
          q: query,
          format: 'json',
          limit: limit,
          addressdetails: 1, // Get detailed address information
          dedupe: 1, // Remove duplicate results
        },
      });

      console.log(`✅ Found ${response.data.length} results`);

      // Transform Nominatim response to our format
      return response.data
        .filter(item => {
          // Filter to only show cities, towns, villages
          const placeTypes = ['city', 'town', 'village', 'municipality', 'county'];
          return placeTypes.some(type => 
            item.type === type || 
            item.class === 'place' ||
            item.addresstype === 'city' ||
            item.addresstype === 'town'
          );
        })
        .map(item => ({
          name: item.name || item.display_name.split(',')[0],
          displayName: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          country: item.address?.country || '',
          countryCode: item.address?.country_code?.toUpperCase() || '',
          state: item.address?.state || item.address?.county || '',
          type: item.type,
          importance: item.importance, // Nominatim's relevance score
        }))
        .sort((a, b) => b.importance - a.importance); // Sort by relevance
    } catch (error) {
      console.error('❌ Nominatim search error:', error);
      if (error.response?.status === 429) {
        console.error('⚠️ Rate limit exceeded. Please wait before making more requests.');
      }
      return [];
    }
  },

  /**
   * Get coordinates from city name (simplified)
   * Returns best match only
   * 
   * @param {string} cityName - City name
   * @returns {Promise<object|null>} Location object or null
   */
  getCoordinates: async (cityName) => {
    const results = await geocodingAPI.searchCities(cityName, 1);
    return results.length > 0 ? results[0] : null;
  },

  /**
   * Reverse geocoding - Get city name from coordinates
   * 
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<object>} Location information
   */
  getCityName: async (lat, lon) => {
    try {
      // Respect rate limit
      await waitForRateLimit();

      console.log(`🔍 Reverse geocoding: (${lat}, ${lon})`);

      const response = await nominatimAPI.get('/reverse', {
        params: {
          lat: lat,
          lon: lon,
          format: 'json',
          addressdetails: 1,
          zoom: 10, // City-level detail
        },
      });

      const data = response.data;
      console.log(`✅ Found: ${data.name || data.display_name.split(',')[0]}`);

      return {
        name: data.name || data.display_name.split(',')[0],
        displayName: data.display_name,
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        country: data.address?.country || '',
        countryCode: data.address?.country_code?.toUpperCase() || '',
        state: data.address?.state || data.address?.county || '',
      };
    } catch (error) {
      console.error('❌ Reverse geocoding error:', error);
      throw new Error('Failed to get city name from coordinates');
    }
  },

  /**
   * Search with autocomplete (debounced for frontend use)
   * Optimized for real-time search input
   * 
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of suggestions
   */
  autocomplete: async (query) => {
    if (query.length < 3) return []; // Require at least 3 characters

    const results = await geocodingAPI.searchCities(query, 5);
    return results.map(city => ({
      ...city,
      label: city.displayName, // For dropdown display
      value: city.name, // For form value
    }));
  },
};

/**
 * Cache wrapper to reduce API calls
 * Stores results in memory for 1 hour
 */
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

export const geocodingAPIWithCache = {
  searchCities: async (query, limit = 5) => {
    const cacheKey = `search_${query}_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('📦 Using cached result for:', query);
      return cached.data;
    }

    const data = await geocodingAPI.searchCities(query, limit);
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  },

  getCityName: async (lat, lon) => {
    const cacheKey = `reverse_${lat.toFixed(4)}_${lon.toFixed(4)}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('📦 Using cached result for:', lat, lon);
      return cached.data;
    }

    const data = await geocodingAPI.getCityName(lat, lon);
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  },

  getCoordinates: async (cityName) => {
    return geocodingAPI.getCoordinates(cityName);
  },

  autocomplete: async (query) => {
    return geocodingAPI.autocomplete(query);
  },
};

// Export both versions
export default geocodingAPI;
