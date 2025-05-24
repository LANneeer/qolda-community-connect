import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import categoriesReducer from './slices/categoriesSlice';
import communityStatsReducer from './slices/communityStatsSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    categories: categoriesReducer,
    communityStats: communityStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 