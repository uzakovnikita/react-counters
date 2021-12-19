import { configureStore } from "@reduxjs/toolkit";
import { reducer as counters } from "./countersSlice";

const store = configureStore({
  reducer: {
    counters,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
