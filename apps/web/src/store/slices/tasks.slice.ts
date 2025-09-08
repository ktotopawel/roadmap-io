import type { NormalizedEntities, NormalizedTask } from '../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchRoadmaps } from './roadmaps.slice.ts';

interface TasksState {
  tasks: NormalizedEntities<NormalizedTask>;
}

const initialState: TasksState = {
  tasks: {
    byId: {},
    allIds: [],
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoadmaps.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
    });
  },
});

export default tasksSlice.reducer;
