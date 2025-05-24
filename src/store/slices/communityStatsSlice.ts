import { createSlice } from '@reduxjs/toolkit';
import { communityStats } from '@/data/mockData';

interface CommunityStatsState {
  totalMembers: number;
  activeServices: number;
  completedExchanges: number;
  neighborhoodsServed: number;
  topCategories: Array<{
    name: string;
    percentage: number;
  }>;
  exchangesByMonth: Array<{
    month: string;
    exchanges: number;
  }>;
}

const initialState: CommunityStatsState = communityStats;

const communityStatsSlice = createSlice({
  name: 'communityStats',
  initialState,
  reducers: {
    updateStats: (state, action) => {
      return { ...state, ...action.payload };
    },
    incrementExchanges: (state) => {
      state.completedExchanges += 1;
    },
    updateMonthlyExchanges: (state, action) => {
      const { month, exchanges } = action.payload;
      const monthIndex = state.exchangesByMonth.findIndex(m => m.month === month);
      if (monthIndex !== -1) {
        state.exchangesByMonth[monthIndex].exchanges = exchanges;
      }
    },
    updateTopCategories: (state, action) => {
      state.topCategories = action.payload;
    },
  },
});

export const {
  updateStats,
  incrementExchanges,
  updateMonthlyExchanges,
  updateTopCategories,
} = communityStatsSlice.actions;

export default communityStatsSlice.reducer; 