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
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userInfo']
};


const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);


export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)