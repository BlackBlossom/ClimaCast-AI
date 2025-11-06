import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - ClimaCast AI</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Construction className="w-20 h-20 text-climate-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Learn more about Team Foresighters - coming soon!
          </p>
          <Link to="/">
            <Button size="lg">Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
