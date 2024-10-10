import express from 'express';
import { createBooking, getUserBookings, getVendorBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

router.get('/vendor', protect, restrictTo('vendor'), getVendorBookings);
router.put('/:id/status', protect, restrictTo('vendor'), updateBookingStatus);

export default router;