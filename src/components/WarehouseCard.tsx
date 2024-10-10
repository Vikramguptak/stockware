import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface WarehouseCardProps {
  warehouse: any;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={warehouse.image} alt={warehouse.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{warehouse.name}</h3>
        <p className="text-gray-600 mb-2">Location: {warehouse.location}</p>
        <p className="text-gray-600 mb-2">Size: {warehouse.size} sqft</p>
        <p className="text-gray-600 mb-4">Price: ${warehouse.price}/month</p>
        <Link to={`/warehouse/${warehouse._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default WarehouseCard;