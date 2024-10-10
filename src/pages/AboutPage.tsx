import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Stockware
      </motion.h1>
      
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          At Stockware, we're on a mission to revolutionize the warehouse and logistics industry. 
          We aim to solve delivery time inefficiencies and maximize the utilization of warehouse space 
          through cutting-edge AI technology and real-time inventory management.
        </p>
      </motion.section>

      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-gray-700">
          Stockware was born out of a simple observation: while some warehouses struggled with 
          overcapacity, others had vast amounts of unused space. We saw an opportunity to create 
          a platform that could bridge this gap, optimizing warehouse utilization and streamlining 
          the entire logistics process.
        </p>
      </motion.section>

      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Target className="text-blue-600" size={40} />}
            title="Innovation"
            description="We constantly push the boundaries of what's possible in logistics and inventory management."
          />
          <ValueCard 
            icon={<Users className="text-green-600" size={40} />}
            title="Collaboration"
            description="We believe in the power of partnerships, working closely with warehouse owners and businesses."
          />
          <ValueCard 
            icon={<TrendingUp className="text-purple-600" size={40} />}
            title="Efficiency"
            description="We're committed to optimizing every aspect of the warehousing and logistics process."
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember 
            name="Jane Doe"
            position="CEO & Co-founder"
            image="https://source.unsplash.com/300x300/?woman"
          />
          <TeamMember 
            name="John Smith"
            position="CTO & Co-founder"
            image="https://source.unsplash.com/300x300/?man"
          />
          <TeamMember 
            name="Emily Brown"
            position="Head of Operations"
            image="https://source.unsplash.com/300x300/?woman,professional"
          />
        </div>
      </motion.section>
    </div>
  );
};

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamMember: React.FC<{ name: string; position: string; image: string }> = ({ name, position, image }) => (
  <div className="text-center">
    <img src={image} alt={name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{position}</p>
  </div>
);

export default AboutPage;