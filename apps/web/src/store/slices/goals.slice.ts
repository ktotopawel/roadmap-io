import type { NormalizedEntities, NormalizedGoal } from '../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchRoadmaps } from './roadmaps.slice.ts';

interface GoalState {
  goals: NormalizedEntities<NormalizedGoal>;
}

const initialState: GoalState = {
  goals: {
    byId: {},
    allIds: [],
  },
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoadmaps.fulfilled, (state, action) => {
      state.goals = action.payload.goals;
    });
  },
});

export default goalsSlice.reducer;
