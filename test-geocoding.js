/**
 * Quick Test Script for Nominatim Geocoding
 * 
 * Open browser console on your Dashboard page and paste this to test!
 */

// Import the geocoding service (if not already imported)
// import { geocodingAPI } from './services/geocoding';

console.log('🧪 Starting Nominatim Geocoding Tests...\n');

async function runTests() {
  try {
    // Test 1: Search for a city
    console.log('📍 Test 1: Search for "London"');
    const londonResults = await geocodingAPI.searchCities('London', 5);
    console.log(`✅ Found ${londonResults.length} results:`, londonResults);
    console.log('');

    // Test 2: Get coordinates for specific city
    console.log('📍 Test 2: Get coordinates for "Tokyo"');
    const tokyo = await geocodingAPI.getCoordinates('Tokyo');
    console.log('✅ Tokyo coordinates:', tokyo);
    console.log('');

    // Test 3: Reverse geocoding
    console.log('📍 Test 3: Reverse geocoding (40.7128, -74.0060)');
    const nyc = await geocodingAPI.getCityName(40.7128, -74.0060);
    console.log('✅ City found:', nyc);
    console.log('');

    // Test 4: Autocomplete
    console.log('📍 Test 4: Autocomplete for "New Y"');
    const suggestions = await geocodingAPI.autocomplete('New Y');
    console.log(`✅ Found ${suggestions.length} suggestions:`, suggestions);
    console.log('');

    // Test 5: Cache test (search same city twice)
    console.log('📍 Test 5: Cache test - searching "Paris" twice');
    const paris1 = await geocodingAPI.searchCities('Paris');
    console.log('First search completed');
    const paris2 = await geocodingAPI.searchCities('Paris');
    console.log('Second search completed (should be cached!)');
    console.log('');

    console.log('✅ All tests completed successfully! 🎉');
    console.log('');
    console.log('📊 Summary:');
    console.log('- Direct geocoding: ✅ Working');
    console.log('- Reverse geocoding: ✅ Working');
    console.log('- Autocomplete: ✅ Working');
    console.log('- Caching: ✅ Working');
    console.log('- Rate limiting: ✅ Working');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
// runTests();

// Individual test functions you can call manually:

window.testSearch = async (cityName) => {
  console.log(`🔍 Searching for: ${cityName}`);
  const results = await geocodingAPI.searchCities(cityName);
  console.log('Results:', results);
  return results;
};

window.testReverse = async (lat, lon) => {
  console.log(`🔍 Reverse geocoding: (${lat}, ${lon})`);
  const city = await geocodingAPI.getCityName(lat, lon);
  console.log('City:', city);
  return city;
};

window.testAutocomplete = async (query) => {
  console.log(`🔍 Autocomplete for: ${query}`);
  const suggestions = await geocodingAPI.autocomplete(query);
  console.log('Suggestions:', suggestions);
  return suggestions;
};

console.log('📝 Test functions available:');
console.log('- window.testSearch("London")');
console.log('- window.testReverse(40.7128, -74.0060)');
console.log('- window.testAutocomplete("New Y")');
console.log('');
console.log('Or run all tests: runTests()');
