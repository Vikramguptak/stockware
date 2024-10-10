import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { predictDemand } from '../services/api';

const AIDemandForecast: React.FC = () => {
  const [forecastData, setForecastData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await predictDemand();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setError('Failed to fetch forecast data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>;
  }

  const chartData = {
    labels: Array.from({ length: forecastData.length }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Predicted Demand',
        data: forecastData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI Demand Forecast</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AIDemandForecast;