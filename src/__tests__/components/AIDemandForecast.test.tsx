import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AIDemandForecast from '../../components/AIDemandForecast';
import { predictDemand } from '../../services/api';

jest.mock('../../services/api');
jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

describe('AIDemandForecast', () => {
  it('renders loading state initially', () => {
    render(<AIDemandForecast />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders forecast data when API call is successful', async () => {
    const mockData = [10, 20, 30, 40, 50];
    (predictDemand as jest.Mock).mockResolvedValue(mockData);

    render(<AIDemandForecast />);

    await waitFor(() => {
      expect(screen.getByText('AI Demand Forecast')).toBeInTheDocument();
    });
  });

  it('renders error message when API call fails', async () => {
    (predictDemand as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<AIDemandForecast />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch forecast data/)).toBeInTheDocument();
    });
  });
});