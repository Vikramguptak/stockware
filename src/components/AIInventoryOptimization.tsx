import React, { useState, useEffect } from 'react';
import { optimizeInventory } from '../services/api';

interface OptimizationResult {
  daysUntilReorder: number;
  reorderQuantity: number;
}

const AIInventoryOptimization: React.FC = () => {
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptimizationData = async () => {
      try {
        const result = await optimizeInventory();
        setOptimizationResult(result);
      } catch (error) {
        console.error('Error fetching optimization data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimizationData();
  }, []);

  if (loading) {
    return <div>Loading optimization data...</div>;
  }

  if (!optimizationResult) {
    return <div>No optimization data available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI Inventory Optimization</h2>
      <div className="space-y-2">
        <p>Days until reorder: <span className="font-semibold">{optimizationResult.daysUntilReorder}</span></p>
        <p>Recommended reorder quantity: <span className="font-semibold">{optimizationResult.reorderQuantity}</span></p>
      </div>
    </div>
  );
};

export default AIInventoryOptimization;