import { configureStore } from '@reduxjs/toolkit';
import roadmapReducer from './slices/roadmaps.slice';

const store = configureStore({
  reducer: {
    roadmaps: roadmapReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
