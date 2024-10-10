import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart, Zap, Truck, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src="/warehouse-logistics.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Optimizing Warehouse Space, Reducing Delivery Times
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            AI-powered real-time warehouse booking and logistics
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/get-started" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<BarChart className="text-blue-600" size={48} />}
              title="Real-time Inventory Management"
              description="Track stock levels and manage warehouse space efficiently"
            />
            <FeatureCard
              icon={<Zap className="text-green-600" size={48} />}
              title="AI-Powered Analytics"
              description="Optimize logistics and forecast demand with predictive analytics"
            />
            <FeatureCard
              icon={<Truck className="text-purple-600" size={48} />}
              title="Logistics Integration"
              description="Seamless integration with transportation providers to reduce delivery times"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard number={1} title="Search" description="Find available warehouse space in your area" />
            <StepCard number={2} title="Book" description="Reserve space instantly with our real-time booking system" />
            <StepCard number={3} title="Store" description="Manage your inventory with our AI-powered platform" />
            <StepCard number={4} title="Optimize" description="Reduce costs and improve efficiency with data-driven insights" />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">What Our Clients Say</h2>
          <blockquote className="text-2xl italic mb-8">
            "Stockware has revolutionized our logistics operations. We've seen a 30% reduction in delivery times and significant cost savings."
          </blockquote>
          <p className="font-semibold">John Doe, CEO of LogisticsPro</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Optimize Your Warehouse Operations?</h2>
          <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
            Get Started Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white p-8 rounded-lg shadow-lg text-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StepCard: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="text-center">
    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">{number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;