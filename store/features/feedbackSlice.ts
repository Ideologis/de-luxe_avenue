import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';


// Define the interface for a feedback item
export interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

// Define the interface for the feedback state
export interface FeedbackState {
  feedbacks: FeedbackItem[];
}

// Define the initial state
const initialState: FeedbackState = {
  feedbacks: [],
};

// Create the feedback slice
export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<Omit<FeedbackItem, 'id' | 'timestamp'>>) => {
      const newFeedback = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.feedbacks.push(newFeedback);
    },
    clearFeedbacks: (state) => {
      state.feedbacks = [];
    },
  },
});

// Export actions
export const { addFeedback, clearFeedbacks } = feedbackSlice.actions;

// Export selectors
export const selectFeedbacks = (state: RootState) => state.feedback.feedbacks;

// Export reducer
export default feedbackSlice.reducer;