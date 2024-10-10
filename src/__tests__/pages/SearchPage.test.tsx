import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchPage from '../../pages/SearchPage';
import * as api from '../../services/api';

jest.mock('../../services/api');

const mockStore = configureStore([]);

describe('SearchPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null },
    });
  });

  test('renders search form and handles submission', async () => {
    const mockSearchResults = {
      warehouses: [
        {
          _id: '1',
          name: 'Test Warehouse',
          location: 'Test Location',
          size: 1000,
          price: 100,
          image: 'test-image.jpg',
        },
      ],
      total: 1,
    };

    (api.searchWarehouses as jest.Mock).mockResolvedValue(mockSearchResults);

    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Size (sqft)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Size (sqft)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Price')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'Test Location' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(api.searchWarehouses).toHaveBeenCalledWith(expect.objectContaining({ location: 'Test Location' }));
      expect(screen.getByText('Test Warehouse')).toBeInTheDocument();
    });
  });
});