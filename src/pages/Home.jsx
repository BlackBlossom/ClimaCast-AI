import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';
import CTASection from '../components/home/CTASection';
import { APP_CONFIG } from '../utils/constants';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          {APP_CONFIG.NAME} - {APP_CONFIG.DESCRIPTION}
        </title>
        <meta
          name="description"
          content="Advanced climate prediction powered by IBM-NASA Prithvi WxC foundation model. Get accurate 7-day weather forecasts with AI-driven insights."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-950 relative">
        {/* Fixed background elements */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950"></div>
          
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-climate-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-climate-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative">
          <Hero />
          
          {/* Section separator with gradient */}
          <div className="relative h-px">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-climate-500/20 to-transparent"></div>
          </div>
          
          <FeaturesSection />
          
          {/* Section separator with gradient */}
          <div className="relative h-px">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-climate-500/20 to-transparent"></div>
          </div>
          
          <CTASection />
        </div>
      </div>
    </>
  );
}
