import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import NotFound from './pages/NotFound';

/**
 * Main App Component with Routing
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout wrapper for all pages */}
          <Route path="/" element={<Layout />}>
            {/* Main pages */}
            <Route index element={<Home />} />
            <Route path="features" element={<Features />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;