import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, User, Menu, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Warehouse size={32} className={`${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Stockware</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <NavItem to="/about" label="About" isScrolled={isScrolled} />
              <NavItem to="/features" label="Features" isScrolled={isScrolled} />
              <NavItem to="/warehouse-owners" label="Warehouse Owners" isScrolled={isScrolled} />
              <NavItem to="/pricing" label="Pricing" isScrolled={isScrolled} />
              <NavItem to="/contact" label="Contact" isScrolled={isScrolled} />
              {user ? (
                <>
                  <NavItem 
                    to={user.role === 'vendor' ? "/vendor-dashboard" : "/user-dashboard"} 
                    label="Dashboard" 
                    isScrolled={isScrolled}
                    icon={<User size={20} className="mr-1" />}
                  />
                  <motion.button 
                    onClick={logout}
                    className={`px-4 py-2 rounded-full ${isScrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-opacity-90 transition duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <NavItem to="/login" label="Login" isScrolled={isScrolled} />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/signup" 
                      className={`px-4 py-2 rounded-full ${isScrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-opacity-90 transition duration-300`}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} /> : <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-4 items-center">
              <MobileNavItem to="/about" label="About" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem to="/features" label="Features" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem to="/warehouse-owners" label="Warehouse Owners" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem to="/pricing" label="Pricing" setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem to="/contact" label="Contact" setIsMenuOpen={setIsMenuOpen} />
              {user ? (
                <>
                  <MobileNavItem 
                    to={user.role === 'vendor' ? "/vendor-dashboard" : "/user-dashboard"} 
                    label="Dashboard" 
                    setIsMenuOpen={setIsMenuOpen}
                  />
                  <li><button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Logout</button></li>
                </>
              ) : (
                <>
                  <MobileNavItem to="/login" label="Login" setIsMenuOpen={setIsMenuOpen} />
                  <li><Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Sign Up</Link></li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavItem: React.FC<{ to: string; label: string; isScrolled: boolean; icon?: React.ReactNode }> = ({ to, label, isScrolled, icon }) => (
  <li>
    <Link 
      to={to} 
      className={`flex items-center ${isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'} transition duration-300`}
    >
      {icon}
      {label}
    </Link>
  </li>
);

const MobileNavItem: React.FC<{ to: string; label: string; setIsMenuOpen: (isOpen: boolean) => void }> = ({ to, label, setIsMenuOpen }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-600 hover:text-blue-600 transition duration-300"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  </li>
);

export default Header;