import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { BasketState, BasketItem } from '../../Interfaces'
const initialState: BasketState = {
  items: [],
  status: 'idle',
  error: null,
  addItemStatus: 'idle',
};

const updateLocalStorage = (items: BasketItem[]) => {
  localStorage.setItem('basket', JSON.stringify(items));
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket(state, action: PayloadAction<BasketItem>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        // If item already exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If item does not exist, add it to the basket
        state.items.push(action.payload);
      }

      // Update local storage with updated basket items
      updateLocalStorage(state.items);
      state.addItemStatus = 'succeeded';
    },
    removeItemFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItemQuantityInBasket(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItemToBasket, removeItemFromBasket, updateItemQuantityInBasket } = basketSlice.actions;

export const selectTotalQuantity = (state: RootState) =>
  state.basket.items.reduce((total, item) => total + item.quantity, 0);

export default basketSlice.reducer;
