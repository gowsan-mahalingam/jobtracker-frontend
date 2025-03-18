import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 