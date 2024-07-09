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
import dashboardSlice from '../features/dashboardSlice';
import dashUserSlice from '../features/dashboardSlice/dashUserSlice';
import dashColorSlice from '../features/dashboardSlice/dashColorSlice';
import dashCategorySlice from '../features/dashboardSlice/dashCategorySlice';
import dashNotificationSlice from '../features/dashboardSlice/dashNotificationSlice';
import dashPaymentSlice from '../features/dashboardSlice/dashPaymentSlice';

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
    dashboard: dashboardSlice,
    dashUser: dashUserSlice,
    dashColor: dashColorSlice,
    dashCategory: dashCategorySlice,
    dashNotification: dashNotificationSlice,
    dashPayment: dashPaymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
