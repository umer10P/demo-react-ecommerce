import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Basket from './Basket';
import { rootReducer, RootState } from '../../store';
import { useBasket } from '../../hooks/useBasket';

jest.mock('../../hooks/useBasket');

const mockUseBasket = useBasket as jest.MockedFunction<typeof useBasket>;

describe('Basket', () => {
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
    mockUseBasket.mockReturnValue({
      items: [
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 2 },
      ],
      addItemStatus: 'succeeded',
      addToBasket: jest.fn(),
      updateItemQuantity: jest.fn(),
      removeFromBasket: jest.fn(),
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders items from the basket', () => {
    renderWithProviders(<Basket />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('2')[0]).toBeInTheDocument();
  });

  it('updates item quantity in the basket', async () => {
    const { getAllByText } = renderWithProviders(<Basket />);

    const incrementButtons = getAllByText('+');
    fireEvent.click(incrementButtons[0]);

    await waitFor(() => {
      expect(mockUseBasket().updateItemQuantity).toHaveBeenCalledWith(1, 2);
    });

    const decrementButtons = getAllByText('-');
    fireEvent.click(decrementButtons[1]);

    await waitFor(() => {
      expect(mockUseBasket().updateItemQuantity).toHaveBeenCalledWith(2, 1);
    });
  });

  it('does not allow item quantity to go below 1', async () => {
    const { getAllByText } = renderWithProviders(<Basket />);

    const decrementButtons = getAllByText('-');
    expect(decrementButtons[0]).toBeDisabled();
  });

  it('removes item from the basket', async () => {
    const { getAllByText } = renderWithProviders(<Basket />);

    const removeButtons = getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(mockUseBasket().removeFromBasket).toHaveBeenCalledWith(1);
    });
  });

  it('displays empty basket message', () => {
    mockUseBasket.mockReturnValueOnce({
      items: [],
      addItemStatus: 'idle',
      addToBasket: jest.fn(),
      updateItemQuantity: jest.fn(),
      removeFromBasket: jest.fn()
    });

    renderWithProviders(<Basket />);

    expect(screen.getByText('Your basket is empty')).toBeInTheDocument();
  });
});
