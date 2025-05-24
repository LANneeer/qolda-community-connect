import { createSlice } from '@reduxjs/toolkit';
import { ServiceCategory } from '@/types';
import { categories } from '@/data/mockData';

interface CategoriesState {
  items: ServiceCategory[];
  selectedCategory: string | null;
}

const initialState: CategoriesState = {
  items: categories,
  selectedCategory: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeCategory: (state, action) => {
      state.items = state.items.filter(category => category.id !== action.payload);
    },
  },
});

export const { 
  setSelectedCategory, 
  addCategory, 
  updateCategory, 
  removeCategory 
} = categoriesSlice.actions;

export default categoriesSlice.reducer; 