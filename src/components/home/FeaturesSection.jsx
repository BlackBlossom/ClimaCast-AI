import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Globe, TrendingUp, AlertTriangle, Sparkles, Cloud } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui';

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Leverage IBM-NASA Prithvi WxC foundation model with 2.3 billion parameters for state-of-the-art accuracy.',
    },
    {
      icon: Zap,
      title: 'Real-Time Forecasts',
      description: 'Get instant 7-day weather predictions with confidence scores ranging from 70% to 98%.',
    },
    {
      icon: AlertTriangle,
      title: 'Extreme Weather Alerts',
      description: 'Automatic detection of extreme conditions with actionable safety recommendations.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access weather predictions for any location worldwide with support for 100+ countries.',
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Understand patterns with atmospheric analysis and historical comparisons.',
    },
    {
      icon: Shield,
      title: 'Reliable & Accurate',
      description: 'Built on 40 years of NASA MERRA-2 data with continuous validation.',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      {/* Section background overlay */}
      <div className="absolute inset-0 bg-gray-900/30"></div>
      
      {/* Local accent gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center_left,var(--tw-gradient-stops))] from-climate-500/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-climate-500/10 border border-climate-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-climate-400" />
            <span className="text-sm font-medium text-climate-300">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Everything You Need for
            <span className="block mt-2 bg-linear-to-r from-climate-400 to-blue-400 bg-clip-text text-transparent">
              Climate Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Advanced AI technology meets intuitive design for accurate weather predictions
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-climate-500/10 border border-climate-500/20 flex items-center justify-center mb-6 group-hover:bg-climate-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-climate-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
