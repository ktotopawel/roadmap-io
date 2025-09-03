import { type Goal, type Roadmap, type Task } from '@roadmap-io/types';

export type NormalizedRoadmap = Omit<Roadmap, 'goals'> & {
  goalIds: string[];
};

export type NormalizedGoal = Omit<Goal, 'subgoals' | 'tasks'> & {
  subgoalIds: string[];
  taskIds: string[];
};

export type NormalizedTask = Task;

export type NormalizedEntities<T> = {
  byId: Record<string, T>;
  allIds: string[];
};
