// src/components/NavBar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NavBar from './NavBar';
import { rootReducer, RootState } from '../../store';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  let store: ReturnType<typeof configureStore>;
  let preloadedState: RootState;

  beforeEach(() => {
    preloadedState = {
      basket: {
        items: [
          { id: 1, name: 'Product 1', price: 100, quantity: 2 },
          { id: 2, name: 'Product 2', price: 200, quantity: 1 },
        ],
        status: 'idle',
        error: null,
        addItemStatus: 'idle',
      },
      products: {
        products: [],
        status: 'idle',
        error: null,
      },
    };

    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });
  });

  it('renders NavBar component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Basket')).toBeInTheDocument();
  });

  it('displays the correct total quantity in the basket', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
        </Provider>
    );

    expect(screen.getByText('3')).toBeInTheDocument(); // 2 + 1 from the preloadedState
  });

  it('displays 0 when the basket is empty', () => {
    preloadedState.basket.items = [];
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
