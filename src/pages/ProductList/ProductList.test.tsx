// src/components/ProductList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ProductList from './ProductList';
import { useProducts } from '../../hooks/useProducts';
import { useBasket } from '../../hooks/useBasket';
import { RootState, rootReducer } from '../../store';

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useBasket');

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockUseBasket = useBasket as jest.MockedFunction<typeof useBasket>;

describe('ProductList', () => {
  const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState as RootState,
    });
  };

  const renderWithProviders = (ui: React.ReactElement, preloadedState?: Partial<RootState>) => {
    const store = setupStore(preloadedState);
    return render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    mockUseProducts.mockReturnValue({
      products: [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ],
      status: 'succeeded',
      error: null,
    });

    mockUseBasket.mockReturnValue({
      items: [
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 2 },
      ],
      addItemStatus: 'idle',
      addToBasket: jest.fn(),
      removeFromBasket: jest.fn(),
      updateItemQuantity: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseProducts.mockReturnValueOnce({
      products: [],
      status: 'loading',
      error: null,
    });

    renderWithProviders(<ProductList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseProducts.mockReturnValueOnce({
      products: [],
      status: 'failed',
      error: 'Failed to fetch products',
    });

    renderWithProviders(<ProductList />);

    expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
  });

  it('renders products', () => {
    renderWithProviders(<ProductList />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

});
