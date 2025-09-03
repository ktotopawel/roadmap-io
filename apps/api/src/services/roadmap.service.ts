import prisma from '../../prisma/prisma';
import { GoalService } from './index';
import { type Goal } from '@roadmap-io/types';

class RoadmapService {
  private goalsService;

  constructor() {
    this.goalsService = new GoalService();
  }

  public async createRoadmap(title: string) {
    try {
      return await prisma.roadmap.create({
        data: {
          title: title,
        },
      });
    } catch (e) {
      throw new Error(`Error creating roadmap: ${e}`);
    }
  }

  public async getRoadmaps() {
    try {
      const roadmaps = await prisma.roadmap.findMany();

      return await Promise.all(
        roadmaps.map(async (roadmap) => {
          return {
            ...roadmap,
            goals: await this.buildGoalTree(await this.goalsService.getGoalByRoadmapId(roadmap.id)),
          };
        })
      );
    } catch (e) {
      throw new Error(`Error fetching roadmaps: ${e}`);
    }
  }

  private async buildGoalTree(goals: Omit<Goal, 'subgoals'>[]) {
    const goalMap = new Map<string, Goal>();

    goals.forEach((goal) => {
      goalMap.set(goal.id, {
        ...goal,
        tasks: goal.tasks.map((task) => ({ ...task, status: task.status })),
        subgoals: [],
      });
    });

    const rootGoals: Goal[] = [];

    goalMap.forEach((goal) => {
      if (goal.parentId !== null) {
        const parentGoal = goalMap.get(goal.parentId);
        if (parentGoal) {
          parentGoal.subgoals.push(goal);
        }
      } else {
        rootGoals.push(goal);
      }
    });

    return rootGoals;
  }
}

export default RoadmapService;
