import { type Goal, type Roadmap, type Task } from '@roadmap-io/types';

export type NormalizedRoadmap = Omit<Roadmap, 'goals' | 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
  goalIds: string[];
};

export type NormalizedGoal = Omit<Goal, 'subgoals' | 'tasks' | 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
  subgoalIds: string[];
  taskIds: string[];
};

export type NormalizedTask = Omit<Task, 'dueDate'> & {
  dueDate: string | null;
};

export type NormalizedEntities<T> = {
  byId: Record<string, T>;
  allIds: string[];
};
