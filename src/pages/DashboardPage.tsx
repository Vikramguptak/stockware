import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Box, Truck, AlertTriangle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const [inventoryData, setInventoryData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Inventory Levels',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    // Fetch real-time data here
    // For now, we'll use mock data
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Box className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Inventory</h2>
          </div>
          <p className="text-3xl font-bold">10,234</p>
          <p className="text-sm text-gray-500">units</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Truck className="text-green-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Active Shipments</h2>
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-gray-500">in transit</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <BarChart className="text-purple-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Utilization Rate</h2>
          </div>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm text-gray-500">of capacity</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-yellow-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-gray-500">items to reorder</p>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Inventory Trends</h2>
        <Line data={inventoryData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-4">AI Insights</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="bg-green-100 text-green-800 p-2 rounded-full mr-2">✓</div>
              Predicted 15% increase in demand next month
            </li>
            <li className="flex items-center">
              <div className="bg-yellow-100 text-yellow-800 p-2 rounded-full mr-2">!</div>
              Recommend restocking Item XYZ within 7 days
            </li>
            <li className="flex items-center">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">i</div>
              Optimal reorder quantity for Item ABC: 500 units
            </li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">
                <Box size={16} />
              </div>
              New shipment arrived: 1000 units of Item DEF
            </li>
            <li className="flex items-center">
              <div className="bg-green-100 text-green-800 p-2 rounded-full mr-2">
                <Truck size={16} />
              </div>
              Outbound shipment dispatched to Customer XYZ
            </li>
            <li className="flex items-center">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-2">
                <BarChart size={16} />
              </div>
              Inventory count completed for Warehouse A
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;