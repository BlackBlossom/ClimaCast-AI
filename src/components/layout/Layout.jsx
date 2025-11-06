import { Outlet } from 'react-router-dom';
import FloatingNavbar from './FloatingNavbar';
import Footer from './Footer';

/**
 * Layout wrapper component
 * Provides consistent floating navbar and footer across all pages
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNavbar />

      {/* Main content area - Outlet renders child routes */}
      {/* Extra top padding to account for floating navbar */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
