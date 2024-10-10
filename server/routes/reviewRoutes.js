import express from 'express';
import { createReview, getWarehouseReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/warehouse/:warehouseId', getWarehouseReviews);

export default router;