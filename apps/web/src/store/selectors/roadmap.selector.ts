import { createSelector } from 'reselect';
import type { RootState } from '../store.ts';
import type { Goal, Roadmap } from '@roadmap-io/types';

const selectActiveRoadmapId = (state: RootState) => state.roadmaps.activeRoadmapId;
const selectRoadmapsById = (state: RootState) => state.roadmaps.roadmaps.byId;
const selectGoalsById = (state: RootState) => state.goals.goals.byId;
const selectTasksById = (state: RootState) => state.tasks.tasks.byId;

const selectActiveRoadmap = createSelector(
  selectActiveRoadmapId,
  selectRoadmapsById,
  selectGoalsById,
  selectTasksById,
  (activeRoadmapId, roadmapsById, goalsById, tasksById) => {
    if (activeRoadmapId === '') return null;

    const roadmap = roadmapsById[activeRoadmapId];
    if (!roadmap) return null;

    const denormalizeGoals = (goalIds: string[]) => {
      const goalArr: Goal[] = [];

      goalIds.forEach((id) => {
        const goal = goalsById[id];
        if (!goal) return null;

        const denormalizedGoal: Goal = {
          id: goal.id,
          title: goal.title,
          parentId: goal.parentId,
          createdAt: goal.createdAt,
          updatedAt: goal.updatedAt,
          roadmapId: goal.roadmapId,
          subgoals: denormalizeGoals(goal.subgoalIds),
          tasks: goal.taskIds.map((taskId) => tasksById[taskId]),
        };

        goalArr.push(denormalizedGoal);
      });

      return goalArr;
    };

    const denormalizedRoadmap: Roadmap = {
      id: roadmap.id,
      title: roadmap.title,
      createdAt: roadmap.createdAt,
      updatedAt: roadmap.updatedAt,
      goals: denormalizeGoals(roadmap.goalIds),
    };

    return denormalizedRoadmap;
  }
);

export default selectActiveRoadmap;
