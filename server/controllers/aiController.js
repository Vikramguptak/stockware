import {
  predictDemand as predictDemandService,
  optimizeInventory as optimizeInventoryService,
  classifyCustomerIntent as classifyCustomerIntentService,
  generateWarehouseRecommendations,
  optimizeWarehouseLayout as optimizeWarehouseLayoutService,
  detectAnomalies as detectAnomaliesService,
  generateSummary as generateSummaryService
} from '../services/aiService.js';
import Warehouse from '../models/Warehouse.js';
import Booking from '../models/Booking.js';

export const predictDemand = async (req, res) => {
  try {
    const historicalData = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
          demand: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formattedData = historicalData.map(item => ({
      date: new Date(item._id).getTime(),
      demand: item.demand
    }));

    const predictions = await predictDemandService(formattedData);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error predicting demand' });
  }
};

export const optimizeInventory = async (req, res) => {
  try {
    const currentStock = 1000; // This should be fetched from the database
    const predictedDemand = 50; // This should be calculated based on historical data
    const reorderPoint = 200;
    const leadTime = 5;

    const result = optimizeInventoryService(currentStock, predictedDemand, reorderPoint, leadTime);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error optimizing inventory' });
  }
};

export const classifyCustomerIntent = async (req, res) => {
  try {
    const { text } = req.body;
    const intent = await classifyCustomerIntentService(text);
    res.json({ intent });
  } catch (error) {
    res.status(500).json({ message: 'Error classifying customer intent' });
  }
};

export const getWarehouseRecommendations = async (req, res) => {
  try {
    const userPreferences = req.body;
    const availableWarehouses = await Warehouse.find({ availability: true });
    const recommendations = generateWarehouseRecommendations(userPreferences, availableWarehouses);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error generating warehouse recommendations' });
  }
};

export const optimizeWarehouseLayout = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // This is a placeholder. In a real scenario, you'd fetch the actual products and their data
    const products = [
      { id: 'A', turnoverRate: 0.8 },
      { id: 'B', turnoverRate: 0.5 },
      { id: 'C', turnoverRate: 0.2 },
    ];

    const optimizedLayout = optimizeWarehouseLayoutService(products, warehouse.size);
    res.json(optimizedLayout);
  } catch (error) {
    res.status(500).json({ message: 'Error optimizing warehouse layout' });
  }
};

export const detectAnomalies = async (req, res) => {
  try {
    const { data } = req.body;
    const anomalies = detectAnomaliesService(data);
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({ message: 'Error detecting anomalies' });
  }
};

export const generateSummary = async (req, res) => {
  try {
    const { text } = req.body;
    const summary = generateSummaryService(text);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: 'Error generating summary' });
  }
};