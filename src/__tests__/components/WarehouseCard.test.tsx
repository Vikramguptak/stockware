import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import WarehouseCard from '../../components/WarehouseCard';

const mockWarehouse = {
  _id: '1',
  name: 'Test Warehouse',
  location: 'Test Location',
  size: 1000,
  price: 100,
  image: 'test-image.jpg',
};

test('renders WarehouseCard with correct information', () => {
  render(
    <Router>
      <WarehouseCard warehouse={mockWarehouse} />
    </Router>
  );

  expect(screen.getByText('Test Warehouse')).toBeInTheDocument();
  expect(screen.getByText('Location: Test Location')).toBeInTheDocument();
  expect(screen.getByText('Size: 1000 sqft')).toBeInTheDocument();
  expect(screen.getByText('Price: $100/month')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
  expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '/warehouse/1');
});