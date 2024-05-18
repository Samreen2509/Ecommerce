import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/productSlice';

// create store
export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
