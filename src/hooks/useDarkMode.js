import { useState, useEffect } from 'react';

/**
 * Custom hook for dark mode management
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  return [isDark, toggleDarkMode];
}
