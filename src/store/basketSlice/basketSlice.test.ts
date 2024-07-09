import basketReducer, { addItemToBasket, removeItemFromBasket, updateItemQuantityInBasket, selectTotalQuantity } from './basketSlice';
import { RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

// Mock initial state

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  addItemStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BasketState = {
  items: [],
  status: 'idle',
  error: null,
  addItemStatus: 'idle',
};

describe('basketSlice reducers', () => {
  it('should handle addItemToBasket', () => {
    const itemToAdd: BasketItem = { id: 1, name: 'Test Product', price: 50, quantity: 1 };
    const nextState = basketReducer(initialState, addItemToBasket(itemToAdd));

    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(itemToAdd);
  });

  it('should handle removeItemFromBasket', () => {
    const itemToRemoveId = 1;
    const state: BasketState = {
      ...initialState,
      items: [{ id: itemToRemoveId, name: 'Test Product', price: 50, quantity: 1 }],
    };

    const nextState = basketReducer(state, removeItemFromBasket(itemToRemoveId));

    expect(nextState.items.length).toBe(0);
  });

  it('should handle updateItemQuantityInBasket', () => {
    const initialStateWithItem: BasketState = {
      ...initialState,
      items: [{ id: 1, name: 'Test Product', price: 50, quantity: 1 }],
    };
    const nextState = basketReducer(initialStateWithItem, updateItemQuantityInBasket({ id: 1, quantity: 2 }));

    expect(nextState.items[0].quantity).toBe(2);
  });
});

describe('selectTotalQuantity selector', () => {
  it('should calculate total quantity in the basket', () => {
    const state: RootState = {
      basket: {
        ...initialState,
        items: [
          { id: 1, name: 'Product 1', price: 100, quantity: 2 },
          { id: 2, name: 'Product 2', price: 200, quantity: 3 },
        ],
      },
      products: {
        products: [],
        status: 'idle',
        error: null,
      }
    };

    const totalQuantity = selectTotalQuantity(state);

    expect(totalQuantity).toBe(5);
  });

  it('should return 0 when basket is empty', () => {
    const state: RootState = {
      ...initialState,
      basket: {
        ...initialState,
        items: [],
      },
      products: {
        products: [],
        status: 'idle',
        error: null,
      }
      // Add other slices if needed for RootState
    };

    const totalQuantity = selectTotalQuantity(state);

    expect(totalQuantity).toBe(0);
  });
});
