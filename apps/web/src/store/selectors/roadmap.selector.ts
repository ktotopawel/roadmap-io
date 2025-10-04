import { createSelector } from 'reselect';
import type { RootState } from '../store.ts';
import type { Goal, Roadmap } from '@roadmap-io/types';
import type { NormalizedGoal, NormalizedRoadmap, NormalizedTask } from '../types.ts';

const selectActiveRoadmapId = (state: RootState): string => state.roadmaps.activeRoadmapId;
const selectRoadmapsById = (state: RootState): Record<string, NormalizedRoadmap> =>
  state.roadmaps.roadmaps.byId;
const selectGoalsById = (state: RootState): Record<string, NormalizedGoal> =>
  state.goals.goals.byId;
const selectTasksById = (state: RootState): Record<string, NormalizedTask> =>
  state.tasks.tasks.byId;

const selectActiveRoadmap = createSelector(
  selectActiveRoadmapId,
  selectRoadmapsById,
  selectGoalsById,
  selectTasksById,
  (activeRoadmapId, roadmapsById, goalsById, tasksById) => {
    if (activeRoadmapId === '') {
      return null;
    }

    const roadmap = roadmapsById[activeRoadmapId];

    const denormalizeGoals = (goalIds: string[]): Goal[] => {
      const goalArr: Goal[] = [];

      goalIds.forEach((id) => {
        const goal = goalsById[id];

        const denormalizedGoal: Goal = {
          id: goal.id,
          title: goal.title,
          parentId: goal.parentId,
          createdAt: new Date(goal.createdAt),
          updatedAt: new Date(goal.updatedAt),
          roadmapId: goal.roadmapId,
          subgoals: denormalizeGoals(goal.subgoalIds),
          tasks: goal.taskIds.map((taskId) => {
            const task = tasksById[taskId];

            return {
              ...task,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
            };
          }),
        };

        goalArr.push(denormalizedGoal);
      });

      return goalArr;
    };

    const denormalizedRoadmap: Roadmap = {
      id: roadmap.id,
      title: roadmap.title,
      createdAt: new Date(roadmap.createdAt),
      updatedAt: new Date(roadmap.updatedAt),
      goals: denormalizeGoals(roadmap.goalIds),
    };

    return denormalizedRoadmap;
  }
);

export default selectActiveRoadmap;
