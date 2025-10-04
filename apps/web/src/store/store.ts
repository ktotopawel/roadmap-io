import { configureStore } from '@reduxjs/toolkit';
import roadmapReducer from './slices/roadmaps.slice';
import goalsReducer from './slices/goals.slice';
import tasksReducer from './slices/tasks.slice';
import authSlice from './slices/auth.slice.ts';

const store = configureStore({
  reducer: {
    roadmaps: roadmapReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
    auth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
