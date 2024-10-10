import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import warehouseRoutes from './routes/warehouseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { setupSocketHandlers } from './socketHandlers.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Set up WebSocket
const io = setupSocketHandlers(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});