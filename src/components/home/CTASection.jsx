import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui';

/**
 * Call to Action Section
 */
export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Local accent gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-climate-500/15 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl bg-gray-900/50 border border-gray-800 p-12 lg:p-16 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-climate-500/5 blur-3xl"></div>

            <div className="relative max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-climate-500/10 border border-climate-500/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-climate-400" />
                <span className="text-sm font-medium text-climate-300">
                  Get Started Today
                </span>
              </motion.div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Ready to Experience{' '}
                <span className="bg-linear-to-r from-climate-400 to-blue-400 bg-clip-text text-transparent">
                  AI-Powered Weather?
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Join thousands of users who trust ClimaCast AI for accurate, reliable weather predictions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-climate-500 hover:bg-climate-600 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-climate-500/20 hover:shadow-xl hover:shadow-climate-500/30 transition-all border-0"
                  >
                    <span className="flex items-center gap-2">
                      Start Free Trial
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
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '98%', label: 'Accuracy Rate' },
              { value: '100+', label: 'Countries' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
