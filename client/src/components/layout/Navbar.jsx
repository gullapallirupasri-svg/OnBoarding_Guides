import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <img
              src="/onboard logo.jpeg"
              alt="OnboardAI Logo"
              className="w-9 h-9 rounded-xl shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow object-cover"
            />
            <span className="text-xl font-bold gradient-text">OnboardAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`btn-ghost text-sm ${location.pathname === '/dashboard' ? 'text-primary-400 bg-primary-500/10' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/generator" className={`btn-ghost text-sm ${location.pathname === '/generator' ? 'text-primary-400 bg-primary-500/10' : ''}`}>
                  Generator
                </Link>
                <Link to="/templates" className={`btn-ghost text-sm ${location.pathname === '/templates' ? 'text-primary-400 bg-primary-500/10' : ''}`}>
                  Templates
                </Link>
                <div className="w-px h-6 bg-surface-700 mx-2" />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-surface-200">{user?.name}</p>
                    <p className="text-xs text-surface-500">{user?.companyName || 'No company'}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="p-2 rounded-lg text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm !px-5 !py-2">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-surface-800/50 mt-2 pt-4"
          >
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-surface-300 hover:bg-surface-800 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/generator" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-surface-300 hover:bg-surface-800 hover:text-white transition-colors">Generator</Link>
                <Link to="/templates" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-surface-300 hover:bg-surface-800 hover:text-white transition-colors">Templates</Link>
                <hr className="border-surface-800" />
                <div className="flex items-center justify-between px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-surface-200">{user?.name}</p>
                    <p className="text-xs text-surface-500">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="btn-danger text-sm">Logout</button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-surface-300 hover:bg-surface-800 hover:text-white transition-colors">Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-primary-400 hover:bg-primary-500/10 transition-colors">Get Started</Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
