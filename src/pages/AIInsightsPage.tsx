import React from 'react';
import AIDemandForecast from '../components/AIDemandForecast';
import AIInventoryOptimization from '../components/AIInventoryOptimization';
import AIChatbot from '../components/AIChatbot';

const AIInsightsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">AI-Powered Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AIDemandForecast />
        <AIInventoryOptimization />
      </div>
      <div className="mt-8">
        <AIChatbot />
      </div>
    </div>
  );
};

export default AIInsightsPage;