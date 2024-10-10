import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getVendorWarehouses, getVendorAnalytics } from '../services/api';
import { setWarehouses } from '../store/slices/warehouseSlice';
import { RootState } from '../store';
import AnalyticsChart from '../components/AnalyticsChart';
import { Box, DollarSign, Users, Star } from 'lucide-react';

const VendorDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const warehousesData = await getVendorWarehouses();
        dispatch(setWarehouses(warehousesData));
        const analyticsData = await getVendorAnalytics();
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [dispatch]);

  const occupancyData = {
    labels: warehouses.map((warehouse: any) => warehouse.name),
    datasets: [
      {
        label: 'Occupancy Rate',
        data: warehouses.map((warehouse: any) => warehouse.occupancyRate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const revenueData = analytics ? {
    labels: analytics.revenueByMonth.map((item: any) => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: analytics.revenueByMonth.map((item: any) => item.revenue),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  } : null;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Box className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Warehouses</h2>
          </div>
          <p className="text-3xl font-bold">{warehouses.length}</p>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <DollarSign className="text-green-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Revenue</h2>
          </div>
          <p className="text-3xl font-bold">${analytics?.totalRevenue.toFixed(2)}</p>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Users className="text-purple-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Bookings</h2>
          </div>
          <p className="text-3xl font-bold">{analytics?.totalBookings}</p>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Star className="text-yellow-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Average Rating</h2>
          </div>
          <p className="text-3xl font-bold">{analytics?.averageRating.toFixed(1)}</p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Warehouse Occupancy</h2>
          <AnalyticsChart data={occupancyData} />
        </div>
        {revenueData && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Monthly Revenue</h2>
            <AnalyticsChart data={revenueData} />
          </div>
        )}
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Your Warehouses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse: any) => (
          <motion.div
            key={warehouse._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{warehouse.name}</h3>
            <p className="text-gray-600 mb-2">Location: {warehouse.location}</p>
            <p className="text-gray-600 mb-2">Size: {warehouse.size} sqft</p>
            <p className="text-gray-600 mb-2">Price: ${warehouse.price}/month</p>
            <p className="text-gray-600">Occupancy Rate: {warehouse.occupancyRate}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboardPage;