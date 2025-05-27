
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Service } from '@/types';
import { getDocuments } from '@/lib/firestore';
import { mockServices } from '@/data/mockData';

interface ServicesState {
  items: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServicesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    try {
      console.log('Fetching services from Firebase...');
      const firebaseServices = await getDocuments<Service>('services');
      
      if (firebaseServices.length > 0) {
        console.log('Found Firebase services:', firebaseServices.length);
        return firebaseServices;
      } else {
        console.log('No Firebase services found, using mock data');
        return mockServices;
      }
    } catch (error) {
      console.log('Firebase error, falling back to mock data:', error);
      return mockServices;
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.items.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.items.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeService: (state, action) => {
      state.items = state.items.filter(service => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export const { addService, updateService, removeService } = servicesSlice.actions;
export default servicesSlice.reducer;
