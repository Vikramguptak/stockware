import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../services/api';
import { motion } from 'framer-motion';
import { Box, Truck, Calendar, DollarSign } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStats, setBookingStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0,
    averageDuration: 0
  });

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // In a real application, you would get the user ID from the authentication context
        const userId = 'user123';
        const data = await getUserBookings(userId);
        setBookings(data);
        calculateBookingStats(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const calculateBookingStats = (bookings) => {
    const activeBookings = bookings.filter(booking => booking.status === 'active');
    const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalCost, 0);
    const totalDuration = bookings.reduce((sum, booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return sum + (end - start) / (1000 * 60 * 60 * 24); // Convert to days
    }, 0);

    setBookingStats({
      totalBookings: bookings.length,
      activeBookings: activeBookings.length,
      totalSpent: totalSpent,
      averageDuration: bookings.length ? totalDuration / bookings.length : 0
    });
  };

  const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Number of Bookings',
        data: [4, 6, 8, 5, 10, 8],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Box className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Bookings</h2>
          </div>
          <p className="text-3xl font-bold">{bookingStats.totalBookings}</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Truck className="text-green-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Active Bookings</h2>
          </div>
          <p className="text-3xl font-bold">{bookingStats.activeBookings}</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <DollarSign className="text-yellow-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Total Spent</h2>
          </div>
          <p className="text-3xl font-bold">${bookingStats.totalSpent.toFixed(2)}</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <Calendar className="text-purple-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Avg. Duration</h2>
          </div>
          <p className="text-3xl font-bold">{bookingStats.averageDuration.toFixed(1)} days</p>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
        <Line data={bookingData} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking: any) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{booking.warehouse.name}</h3>
            <p className="text-gray-600 mb-2">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">Total Cost: ${booking.totalCost}</p>
            <p className="text-gray-600">Status: {booking.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;