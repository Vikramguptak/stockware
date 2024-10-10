import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const searchWarehouses = async (params: any) => {
  const response = await api.get('/warehouses', { params });
  return response.data;
};

export const getUserBookings = async (userId: string) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

export const getVendorWarehouses = async () => {
  const response = await api.get('/warehouses/vendor');
  return response.data;
};

export const getVendorAnalytics = async () => {
  const response = await api.get('/warehouses/vendor/analytics');
  return response.data;
};

export const predictDemand = async () => {
  const response = await api.get('/ai/predict-demand');
  return response.data;
};

export const optimizeInventory = async () => {
  const response = await api.get('/ai/optimize-inventory');
  return response.data;
};

export const classifyCustomerIntent = async (text: string) => {
  const response = await api.post('/ai/classify-intent', { text });
  return response.data.intent;
};

export default api;