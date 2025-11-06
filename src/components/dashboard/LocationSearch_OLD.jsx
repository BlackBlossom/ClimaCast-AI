import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { Input, Button } from '../ui';
import { POPULAR_CITIES } from '../../utils/constants';
import { geocodingAPIWithCache as geocodingAPI } from '../../services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Location Search Component with Nominatim Geocoding
 */
export function LocationSearch({ onLocationSelect, currentLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // Debounced search with rate limiting consideration
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setLoading(true);
        setError(null);

        try {
          const results = await geocodingAPI.searchCities(searchTerm, 5);

          if (results.length === 0) {
            setError('No cities found. Try a different search term.');
          }

          setSuggestions(results);
          setShowSuggestions(true);
        } catch (err) {
          console.error('Search error:', err);
          setError('Search failed. Please try again.');
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setError(null);
      }
    }, 800); // Longer debounce (800ms) to respect rate limits

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityClick = (city) => {
    setSearchTerm(city.displayName || city.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setError(null);
    onLocationSelect(city.lat, city.lon, city.name);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    setError(null);
  };

  const handleUseMyLocation = async () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log(`📍 Got device location: (${latitude}, ${longitude})`);

          const city = await geocodingAPI.getCityName(latitude, longitude);

          handleCityClick({
            ...city,
            lat: latitude,
            lon: longitude,
          });
        } catch (err) {
          console.error('Error getting location:', err);
          setError('Could not determine your location. Please search manually.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLoading(false);

        let errorMessage = 'Unable to get your location. ';
        if (err.code === 1) errorMessage += 'Please grant location permission.';
        else if (err.code === 2) errorMessage += 'Location unavailable.';
        else if (err.code === 3) errorMessage += 'Location request timed out.';

        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Input with Autocomplete */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Type at least 3 characters to search (e.g., London)..."
            className="pl-10 pr-10"
            disabled={loading}
          />

          {/* Clear button */}
          {searchTerm && !loading && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-climate-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}

        {/* Autocomplete Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto"
            >
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <p className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  Search results powered by OpenStreetMap
                </p>
              </div>

              {suggestions.map((city, index) => (
                <button
                  key={`${city.lat}-${city.lon}-${index}`}
                  onClick={() => handleCityClick(city)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-start gap-3 border-t border-gray-100 dark:border-gray-700 first:border-t-0"
                >
                  <MapPin className="w-4 h-4 text-climate-500 shrink-0 mt-1" />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {city.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {city.displayName}
                    </p>
                    {city.state && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {city.state}{city.country ? `, ${city.country}` : ''}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 shrink-0 text-right">
                    <div>{city.lat.toFixed(2)}°</div>
                    <div>{city.lon.toFixed(2)}°</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popular Cities Quick Access */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Popular Cities
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.map((city) => (
            <Button
              key={city.name}
              variant={currentLocation?.name === city.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCityClick(city)}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              {city.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Use My Location Button */}
      <div className="flex justify-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUseMyLocation}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Use My Current Location
        </Button>
      </div>

      {/* Info text */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Geocoding powered by OpenStreetMap Nominatim
      </p>
    </div>
  );
}
