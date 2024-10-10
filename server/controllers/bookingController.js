import Booking from '../models/Booking.js';
import Warehouse from '../models/Warehouse.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async (req, res) => {
  const { warehouseId, startDate, endDate } = req.body;

  try {
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Calculate total cost
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalCost = days * warehouse.price;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100, // Stripe expects amount in cents
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    const booking = new Booking({
      user: req.user._id,
      warehouse: warehouseId,
      startDate,
      endDate,
      totalCost,
      paymentIntentId: paymentIntent.id,
    });

    const createdBooking = await booking.save();
    res.status(201).json({
      booking: createdBooking,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('warehouse');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getVendorBookings = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({ vendor: req.user._id });
    const warehouseIds = warehouses.map(w => w._id);
    const bookings = await Booking.find({ warehouse: { $in: warehouseIds } }).populate('warehouse').populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};