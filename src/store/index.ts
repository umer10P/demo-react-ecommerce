import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice/productsSlice';
import basketReducer from './basketSlice/basketSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

const store = configureStore({
  reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

export { rootReducer };