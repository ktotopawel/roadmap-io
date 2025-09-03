import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  NormalizedEntities,
  NormalizedGoal,
  NormalizedRoadmap,
  NormalizedTask,
} from '../types.ts';
import api from '../../utils/axios.ts';
import { API_ENDPOINTS } from '../../../config/api.ts';
import * as z from 'zod';
import { type Goal, RoadmapSchema } from '@roadmap-io/types';
import StatusEnum, { type StatusKeys } from '../../../config/Status.enum.ts';

interface RoadmapsState {
  roadmaps: NormalizedEntities<NormalizedRoadmap>;
  activeRoadmap: NormalizedRoadmap | null;
  status: StatusKeys;
  error: string | null;
}

const fetchRoadmaps = createAsyncThunk('roadmaps/fetchRoadmaps', async (_, thunkAPI) => {
  try {
    const response = await api.get(API_ENDPOINTS.ROADMAPS);
    const responseData = response.data;

    const validateResult = z.array(RoadmapSchema).safeParse(responseData);

    if (!validateResult.success) {
      console.error('Validation error:', validateResult.error);
      return thunkAPI.rejectWithValue('Data validation error');
    }

    const roadmaps = validateResult.data;

    const normalizedData: {
      roadmaps: NormalizedEntities<NormalizedRoadmap>;
      goals: NormalizedEntities<NormalizedGoal>;
      tasks: NormalizedEntities<NormalizedTask>;
    } = {
      roadmaps: { byId: {}, allIds: [] },
      goals: { byId: {}, allIds: [] },
      tasks: { byId: {}, allIds: [] },
    };

    const normalizeTasksAndGoals = (goals: Goal[]) => {
      goals.forEach((goal) => {
        const { subgoals, tasks, ...normalizedGoal } = goal;

        normalizedData.goals.byId[goal.id] = {
          ...normalizedGoal,
          subgoalIds: subgoals.map((subgoal) => subgoal.id),
          taskIds: tasks.map((task) => task.id),
        };
        normalizedData.goals.allIds.push(goal.id);

        tasks.forEach((task) => {
          normalizedData.tasks.byId[task.id] = task;
          normalizedData.tasks.allIds.push(task.id);
        });

        if (subgoals.length > 0) {
          normalizeTasksAndGoals(subgoals);
        }
      });
    };

    roadmaps.forEach((roadmap) => {
      const { goals, ...normalizedRoadmap } = roadmap;

      normalizedData.roadmaps.byId[roadmap.id] = {
        ...normalizedRoadmap,
        goalIds: roadmap.goals.map((goal) => goal.id),
      };
      normalizedData.roadmaps.allIds.push(roadmap.id);

      normalizeTasksAndGoals(goals);
    });

    return normalizedData;
  } catch (e) {
    console.error('Fetch error:', e);
    return thunkAPI.rejectWithValue('Fetch error');
  }
});

const initialState: RoadmapsState = {
  roadmaps: {
    byId: {},
    allIds: [],
  },
  activeRoadmap: null,
  status: StatusEnum.IDLE,
  error: null,
};

const roadmapsSlice = createSlice({
  name: 'roadmaps',
  initialState,
  reducers: {
    setActiveRoadmap: (state, action: PayloadAction<NormalizedRoadmap>) => {
      state.activeRoadmap = action.payload;
    },
    setRoadmaps: (state, action: PayloadAction<NormalizedEntities<NormalizedRoadmap>>) => {
      state.roadmaps = action.payload;
    },
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoadmaps.fulfilled, (state, action) => {
      state.roadmaps = action.payload.roadmaps;
      state.status = StatusEnum.SUCCEEDED;
    });
    builder.addCase(fetchRoadmaps.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchRoadmaps.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch roadmaps: unknown error';
      state.status = StatusEnum.FAILED;
    });
  },
});

export const { clearState, setActiveRoadmap, setRoadmaps } = roadmapsSlice.actions;

export { fetchRoadmaps };

export default roadmapsSlice.reducer;
