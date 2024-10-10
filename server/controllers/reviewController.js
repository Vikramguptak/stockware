import Review from '../models/Review.js';
import Warehouse from '../models/Warehouse.js';

export const createReview = async (req, res) => {
  try {
    const { warehouseId, rating, comment } = req.body;

    const review = new Review({
      user: req.user._id,
      warehouse: warehouseId,
      rating,
      comment,
    });

    const savedReview = await review.save();

    // Update warehouse rating
    const warehouse = await Warehouse.findById(warehouseId);
    const allReviews = await Review.find({ warehouse: warehouseId });
    const averageRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
    
    warehouse.rating = averageRating;
    warehouse.numReviews = allReviews.length;
    await warehouse.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review' });
  }
};

export const getWarehouseReviews = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const reviews = await Review.find({ warehouse: warehouseId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};