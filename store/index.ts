import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import loadingReducer from "./features/loadingSlice";
import feedbackReducer from "./features/feedbackSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loading: loadingReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
