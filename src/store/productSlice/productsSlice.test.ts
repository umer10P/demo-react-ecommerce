import productsReducer, { fetchProducts } from './productsSlice';
import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Mock axios for testing purposes
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock initial state
const initialState = {
  products: [],
  status: 'idle' as const,
  error: null as string | null,
};

describe('productsSlice reducers', () => {
  it('should handle fetchProducts.pending', () => {
    const nextState = productsReducer(initialState, fetchProducts.pending('fetchProducts', undefined));

    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];
    const nextState = productsReducer(initialState, fetchProducts.fulfilled(mockProducts, ''));

    expect(nextState.status).toBe('succeeded');
    expect(nextState.products).toEqual(mockProducts);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchProducts.rejected', () => {
    const errorMessage = 'Failed to fetch products';
    const nextState = productsReducer(initialState, fetchProducts.rejected(new Error(errorMessage), ''));
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe(errorMessage);
  });
});
