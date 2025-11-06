import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Cloud, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../ui';
import { Suspense, lazy } from 'react';

// Lazy load the globe for better performance
const RotatingGlobe = lazy(() => import('./RotatingGlobe'));

export default function Hero() {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Local accent gradient for hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-climate-500/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-climate-500/10 border border-climate-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-climate-400" />
              <span className="text-sm font-medium text-climate-300">
                Powered by IBM-NASA Prithvi WxC 2.3B
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Climate Predictions
              <span className="block mt-2 bg-linear-to-r from-climate-400 to-blue-400 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Experience the future of weather forecasting with our{' '}
              <span className="text-white font-semibold">2.3 billion parameter</span>{' '}
              foundation model trained on 40 years of NASA data.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-climate-500 hover:bg-climate-600 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-climate-500/20 hover:shadow-xl hover:shadow-climate-500/30 transition-all border-0"
                >
                  <span className="flex items-center gap-2">
                    Try Dashboard Free
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>

              <Link to="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 hover:border-gray-600 px-8 py-6 text-base font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { icon: TrendingUp, value: '98%', label: 'Accuracy' },
                { icon: Cloud, value: '2.3B', label: 'Parameters' },
                { icon: Sparkles, value: '40+', label: 'Years Data' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center lg:text-left">
                    <Icon className="w-5 h-5 text-climate-400 mb-2 mx-auto lg:mx-0" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px] h-[400px] flex items-center justify-center"
          >
            {/* Glow effect behind globe */}
            <div className="absolute inset-0 bg-climate-500/10 rounded-full blur-3xl"></div>
            
            {/* Globe container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-climate-500/30 border-t-climate-500 rounded-full animate-spin"></div>
                  </div>
                }
              >
                <RotatingGlobe />
              </Suspense>
            </div>

            {/* Floating info cards - minimalist */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-10 px-4 py-3 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Real-time Updates</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Every 30 minutes</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-10 left-10 px-4 py-3 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-climate-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Global Coverage</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">100+ countries</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
