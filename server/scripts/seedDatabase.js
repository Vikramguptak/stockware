import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Warehouse from '../models/Warehouse.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Warehouse.deleteMany({});
    await Booking.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      role: 'vendor',
    });

    // Create sample warehouses
    const warehouse1 = await Warehouse.create({
      name: 'Warehouse A',
      location: 'New York',
      size: 1000,
      price: 100,
      vendor: user2._id,
    });

    const warehouse2 = await Warehouse.create({
      name: 'Warehouse B',
      location: 'Los Angeles',
      size: 1500,
      price: 150,
      vendor: user2._id,
    });

    // Create sample bookings
    const startDate = new Date('2023-01-01');
    for (let i = 0; i < 100; i++) {
      const bookingDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      await Booking.create({
        user: user1._id,
        warehouse: i % 2 === 0 ? warehouse1._id : warehouse2._id,
        startDate: bookingDate,
        endDate: new Date(bookingDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        totalCost: i % 2 === 0 ? 700 : 1050,
      });
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();