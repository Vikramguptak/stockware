// ... (previous code)

export const getVendorAnalytics = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const warehouses = await Warehouse.find({ vendor: vendorId });
    const warehouseIds = warehouses.map(w => w._id);

    const bookings = await Booking.find({ warehouse: { $in: warehouseIds } });
    const reviews = await Review.find({ warehouse: { $in: warehouseIds } });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalCost, 0);
    const averageBookingDuration = bookings.reduce((acc, booking) => {
      const duration = (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24);
      return acc + duration;
    }, 0) / totalBookings;

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    const revenueByMonth = await Booking.aggregate([
      { $match: { warehouse: { $in: warehouseIds } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$startDate" } },
          revenue: { $sum: "$totalCost" }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { month: "$_id", revenue: 1, _id: 0 } }
    ]);

    res.json({
      totalBookings,
      totalRevenue,
      averageBookingDuration,
      averageRating,
      revenueByMonth
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendor analytics' });
  }
};

// ... (rest of the code)