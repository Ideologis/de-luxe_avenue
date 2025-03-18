import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

/**
 * NOTE: For data fetching operations, consider using React Query's built-in
 * loading states (isLoading, isFetching) instead of this Redux loading state.
 * 
 * Example:
 * const { data, isLoading, error } = useQuery({
 *   queryKey: ['someData'],
 *   queryFn: fetchSomeData,
 * });
 * 
 * This Redux loading state is maintained for:
 * 1. Backward compatibility with existing components
 * 2. Loading states not related to data fetching (e.g., form submissions)
 * 3. Global loading indicators that need to be controlled from multiple components
 */

// Define the interface for the loading state
export interface LoadingState {
  isLoading: boolean;
}

// Define the initial state
const initialState: LoadingState = {
  isLoading: false,
};

// Create the loading slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Export the action
export const { setLoading } = loadingSlice.actions;

// Export the selector
export const selectLoading = (state: RootState) => state.loading.isLoading;

// Export the reducer
export default loadingSlice.reducer;
