import { configureStore } from '@reduxjs/toolkit';
import roadmapReducer from './slices/roadmaps.slice';
import goalsReducer from './slices/goals.slice';
import tasksReducer from './slices/tasks.slice';

const store = configureStore({
  reducer: {
    roadmaps: roadmapReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
