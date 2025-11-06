import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { Input, Button } from '../ui';
import { POPULAR_CITIES } from '../../utils/constants';
import { geocodingAPIWithCache as geocodingAPI } from '../../services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Location Search Component with Nominatim Geocoding - REDESIGNED
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
    }, 800);

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

  // Handle popular city click (uses pre-saved coordinates, no search needed)
  const handlePopularCityClick = (city) => {
    // Don't update search box for popular cities
    setShowSuggestions(false);
    setSuggestions([]);
    setError(null);
    // Directly use the pre-saved lat/lon from POPULAR_CITIES constant
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
    <div className="space-y-6">
      {/* Search Input with Autocomplete */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search for any city worldwide... (min 3 characters)"
            className="pl-12 pr-12 h-14 text-base bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-climate-500 focus:ring-climate-500/20"
            disabled={loading}
          />

          {/* Clear button */}
          {searchTerm && !loading && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-climate-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
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
              className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-80 overflow-y-auto backdrop-blur-xl"
            >
              <div className="p-3 border-b border-gray-700 bg-gray-900/50">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Powered by OpenStreetMap Nominatim
                </p>
              </div>

              {suggestions.map((city, index) => (
                <button
                  key={`${city.lat}-${city.lon}-${index}`}
                  onClick={() => handleCityClick(city)}
                  className="w-full px-4 py-4 text-left hover:bg-gray-700/50 transition-colors flex items-start gap-3 border-t border-gray-700/50 first:border-t-0 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-climate-500/10 border border-climate-500/20 flex items-center justify-center shrink-0 group-hover:bg-climate-500/20 transition-colors">
                    <MapPin className="w-5 h-5 text-climate-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate text-base">
                      {city.name}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-1 mt-0.5">
                      {city.displayName}
                    </p>
                    {city.state && (
                      <p className="text-xs text-gray-500 mt-1">
                        {city.state}{city.country ? `, ${city.country}` : ''}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 shrink-0 text-right space-y-1">
                    <div className="font-mono">{city.lat.toFixed(2)}°</div>
                    <div className="font-mono">{city.lon.toFixed(2)}°</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popular Cities Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-300">
            Quick Access
          </p>
          <p className="text-xs text-gray-500">Popular Cities</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POPULAR_CITIES.map((city) => (
            <Button
              key={city.name}
              variant={currentLocation?.name === city.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePopularCityClick(city)}
              disabled={loading}
              className={`flex items-center justify-center gap-2 h-12 ${
                currentLocation?.name === city.name
                  ? 'bg-climate-500 hover:bg-climate-600 border-climate-500 text-white'
                  : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{city.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Use My Location Button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUseMyLocation}
          disabled={loading}
          className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors h-11 px-6"
        >
          <Navigation className="w-4 h-4" />
          <span className="font-medium">Use My Current Location</span>
        </Button>
      </div>

      {/* Info text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Free geocoding with no API key required • 100% OpenStreetMap
        </p>
      </div>
    </div>
  );
}
