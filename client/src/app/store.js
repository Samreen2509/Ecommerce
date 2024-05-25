import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/productSlice';
import categorySlice from '../features/categorySlice';

// create store
export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
  },
});
