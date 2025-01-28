import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi'; // Import your authApi
import authReducer from './reducers/authReducer'; // Import your authReducer
import { useDispatch, useSelector } from 'react-redux';
import { adsApi } from '../services/adsApi';
import adsReducer from "./reducers/adsReducer"; 
import walletReducer from './reducers/walletReducer'; 
import { walletApi } from '../services/walletApi';

// Configure the store
const store = configureStore({
  reducer: {
    ads: adsReducer,
    wallet: walletReducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
    auth: authReducer, // Add your authReducer here
    [authApi.reducerPath]: authApi.reducer, // Add authApi reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,adsApi.middleware,walletApi.middleware), // Add middleware for api
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector with correct types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);

export default store;
