import React from 'react';
import { Search, Box, Clock, CreditCard } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">How It Works</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center mb-8">
            <Search className="text-blue-600 mr-4" size={48} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. Search</h2>
              <p>Enter your location and storage requirements to find available spaces near you.</p>
            </div>
          </div>
          
          <div className="flex items-center mb-8">
            <Box className="text-blue-600 mr-4" size={48} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Compare</h2>
              <p>Browse through the options, compare prices, and read reviews to find the perfect space.</p>
            </div>
          </div>
          
          <div className="flex items-center mb-8">
            <CreditCard className="text-blue-600 mr-4" size={48} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Book</h2>
              <p>Reserve your space instantly with our secure online booking system.</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="text-blue-600 mr-4" size={48} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Move In</h2>
              <p>Move in on your schedule. Your space will be ready when you arrive.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-4">✓</div>
              <span>Wide variety of storage options</span>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-4">✓</div>
              <span>Secure and reliable spaces</span>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-4">✓</div>
              <span>Flexible rental periods</span>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-4">✓</div>
              <span>Competitive pricing</span>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-4">✓</div>
              <span>Easy online booking process</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;