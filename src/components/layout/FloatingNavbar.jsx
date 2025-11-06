import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui';
import { useDarkMode } from '../../hooks/useDarkMode';
import { APP_CONFIG, NAV_LINKS } from '../../utils/constants';
import { cn } from '../../utils/cn';

/**
 * Floating Navbar Component - Aceternity Style
 * Features: Glass morphism, smooth animations, scroll detection
 */
export default function FloatingNavbar() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Floating Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
          'w-[95%] max-w-7xl'
        )}
      >
        <div
          className={cn(
            'relative rounded-2xl border transition-all duration-300',
            scrolled
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-2xl'
              : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-gray-200/30 dark:border-gray-700/30 shadow-xl'
          )}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-climate-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"></div>

          <div className="px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-br from-climate-500 to-climate-700 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                  <div className="relative p-2 bg-linear-to-br from-climate-500 to-climate-700 rounded-xl">
                    <Cloud className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold gradient-text">
                    {APP_CONFIG.NAME}
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive(item.href)
                            ? 'text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:text-climate-600 dark:hover:text-climate-400'
                        )}
                      >
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-linear-to-r from-climate-500 to-climate-600 rounded-xl -z-10"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        {item.name}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                {/* Dark mode toggle */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </motion.button>

                {/* CTA Button */}
                <Link to="/dashboard" className="hidden sm:block">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="default"
                      size="sm"
                      className="relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-climate-400 to-climate-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Try Now
                      </span>
                    </Button>
                  </motion.div>
                </Link>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md md:hidden"
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-4">
              <div className="space-y-2">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={cn(
                        'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-linear-to-r from-climate-500 to-climate-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block mt-4"
                >
                  <Button variant="default" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Try Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
