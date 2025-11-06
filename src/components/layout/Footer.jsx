import { Link } from 'react-router-dom';
import { Cloud, Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'How It Works', href: '/how-it-works' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/about#team' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/docs#api' },
      { name: 'Support', href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@climacast.ai' },
  ];

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-climate-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-climate-500 to-climate-700 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative p-2 bg-linear-to-br from-climate-600 to-climate-500 rounded-xl">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {APP_CONFIG.NAME}
                </h3>
                <p className="text-xs text-gray-400">
                  {APP_CONFIG.DESCRIPTION}
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Advanced climate prediction powered by IBM-NASA Prithvi WxC
              foundation model. Get accurate 7-day weather forecasts with
              AI-driven insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 bg-gray-800 rounded-xl border border-gray-700 hover:border-climate-500 hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-climate-400 transition" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-climate-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              © 2025 {APP_CONFIG.TEAM}. Made with
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              for a better climate future.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-climate-400 transition"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-climate-400 transition"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-climate-400 transition"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
