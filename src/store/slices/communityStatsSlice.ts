
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommunityStats } from '@/data/mockData';
import { getDocuments } from '@/lib/firestore';

interface CommunityStatsState {
  totalMembers: number;
  activeServices: number;
  completedExchanges: number;
  neighborhoodsServed: number;
  averageRating: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommunityStatsState = {
  totalMembers: 0,
  activeServices: 0,
  completedExchanges: 0,
  neighborhoodsServed: 0,
  averageRating: 0,
  status: 'idle',
  error: null,
};

export const fetchCommunityStats = createAsyncThunk(
  'communityStats/fetchCommunityStats',
  async () => {
    // Try to fetch from Firebase, fallback to mock data
    try {
      const services = await getDocuments('services');
      const users = await getDocuments('users');
      
      return {
        totalMembers: users.length,
        activeServices: services.filter((s: any) => s.status === 'active').length,
        completedExchanges: services.filter((s: any) => s.status === 'completed').length,
        neighborhoodsServed: new Set(services.map((s: any) => s.location?.neighborhood)).size,
        averageRating: 4.8,
      };
    } catch (error) {
      // Fallback to mock data
      return {
        totalMembers: 1250,
        activeServices: 340,
        completedExchanges: 890,
        neighborhoodsServed: 25,
        averageRating: 4.8,
      };
    }
  }
);

const communityStatsSlice = createSlice({
  name: 'communityStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunityStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalMembers = action.payload.totalMembers;
        state.activeServices = action.payload.activeServices;
        state.completedExchanges = action.payload.completedExchanges;
        state.neighborhoodsServed = action.payload.neighborhoodsServed;
        state.averageRating = action.payload.averageRating;
      })
      .addCase(fetchCommunityStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch community stats';
      });
  },
});

export default communityStatsSlice.reducer;
