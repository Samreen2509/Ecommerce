import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/productSlice';
import authSlice from '../features/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from '../features/cartSlice';
import categorySlice from '../features/categorySlice';
import wishlistSlice from '../features/wishlistSlice';
import orderSlice from '../features/orderSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
