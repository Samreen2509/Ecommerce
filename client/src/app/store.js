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
import colorSlice from '../features/colorSlice';
import userSlice from '../features/userSlice';
import notificationSlice from '../features/notificationSlice';
import dashboardSlice from '../features/dashboardSlice';
import paymentSlice from '../features/paymentSlice';
import productSlice from '../features/productSlice';

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
    color: colorSlice,
    auth: persistedAuthReducer,
    user: userSlice,
    dashboard: dashboardSlice,
    notification: notificationSlice,
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
