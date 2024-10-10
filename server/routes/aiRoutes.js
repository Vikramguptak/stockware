import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  predictDemand,
  optimizeInventory,
  classifyCustomerIntent,
  getWarehouseRecommendations,
  optimizeWarehouseLayout,
  detectAnomalies,
  generateSummary
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/predict-demand', protect, predictDemand);
router.get('/optimize-inventory', protect, optimizeInventory);
router.post('/classify-intent', classifyCustomerIntent);
router.post('/warehouse-recommendations', protect, getWarehouseRecommendations);
router.get('/optimize-layout/:warehouseId', protect, optimizeWarehouseLayout);
router.post('/detect-anomalies', protect, detectAnomalies);
router.post('/generate-summary', protect, generateSummary);

export default router;