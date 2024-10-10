import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Warehouse } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Warehouse size={32} className="text-blue-400" />
              <span className="text-2xl font-bold">Stockware</span>
            </Link>
            <p className="text-gray-400">Revolutionizing storage solutions for businesses and individuals.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">About Us</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-blue-400 transition duration-300">Find Storage</Link></li>
              <li><Link to="/list-your-space" className="text-gray-400 hover:text-blue-400 transition duration-300">List Your Space</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-blue-400 transition duration-300">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-blue-400 transition duration-300">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 transition duration-300">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><Linkedin size={24} /></a>
            </div>
            <p className="text-gray-400">Subscribe to our newsletter for updates and offers.</p>
            <form className="mt-2">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700 transition duration-300">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2024 Stockware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;