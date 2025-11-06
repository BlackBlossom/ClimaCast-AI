import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

/**
 * 3D Rotating Globe Component
 * Interactive globe showing weather locations
 */
export default function RotatingGlobe() {
  const globeEl = useRef();
  const [globeReady, setGlobeReady] = useState(false);

  // Sample weather locations to display
  const locations = [
    { lat: 28.6139, lng: 77.209, label: 'Delhi', size: 0.8, color: '#0ea5e9' },
    { lat: 19.076, lng: 72.8777, label: 'Mumbai', size: 0.7, color: '#0ea5e9' },
    { lat: 12.9716, lng: 77.5946, label: 'Bangalore', size: 0.6, color: '#0ea5e9' },
    { lat: 40.7128, lng: -74.006, label: 'New York', size: 0.8, color: '#f97316' },
    { lat: 51.5074, lng: -0.1278, label: 'London', size: 0.7, color: '#f97316' },
    { lat: 35.6762, lng: 139.6503, label: 'Tokyo', size: 0.7, color: '#f97316' },
    { lat: -33.8688, lng: 151.2093, label: 'Sydney', size: 0.6, color: '#f97316' },
    { lat: 1.3521, lng: 103.8198, label: 'Singapore', size: 0.5, color: '#10b981' },
  ];

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.8;
      globeEl.current.controls().enableZoom = false;
      
      // Set initial viewing angle
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
      
      setGlobeReady(true);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: globeReady ? 1 : 0, scale: globeReady ? 1 : 0.8 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      <Globe
        ref={globeEl}
        width={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.45, 700) : 700}
        height={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.45, 700) : 700}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        
        // Points data
        pointsData={locations}
        pointAltitude={0.01}
        pointRadius={(d) => d.size}
        pointColor={(d) => d.color}
        pointLabel={(d) => `
          <div style="
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            padding: 8px 12px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
          ">
            ${d.label}
          </div>
        `}
        
        // Arcs between points
        arcsData={[
          { startLat: 28.6139, startLng: 77.209, endLat: 40.7128, endLng: -74.006 },
          { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503 },
          { startLat: 19.076, startLng: 72.8777, endLat: 1.3521, endLng: 103.8198 },
        ]}
        arcColor={() => 'rgba(14, 165, 233, 0.3)'}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        arcStroke={0.5}
        
        // Atmosphere
        atmosphereColor="rgba(14, 165, 233, 0.3)"
        atmosphereAltitude={0.2}
        
        // Animation
        animateIn={true}
      />
    </motion.div>
  );
}
