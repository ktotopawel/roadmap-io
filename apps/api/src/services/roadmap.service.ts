import type { Roadmap, RoadmapListReturnType } from '@roadmap-io/types';
import { type Goal } from '@roadmap-io/types';
import DatabaseError from '../errors/databaseError';
import type GoalService from './goal.service';
import type { PrismaClient } from '@prisma/client';

class RoadmapService {
  private goalsService;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient, goalsService: GoalService) {
    this.goalsService = goalsService;
    this.prisma = prisma;
  }

  public async createRoadmap(
    title: string,
    userId: string,
    description?: string
  ): Promise<Omit<Roadmap, 'goals'>> {
    try {
      return await this.prisma.roadmap.create({
        data: {
          title: title,
          userId: userId,
          description: description ?? null,
        },
      });
    } catch (e) {
      throw new DatabaseError('Error creating roadmap', e);
    }
  }

  public async getRoadmapById(roadmapId: string): Promise<Roadmap> {
    try {
      const roadmap = await this.prisma.roadmap.findUnique({
        where: {
          id: roadmapId,
        },
      });

      if (!roadmap) {
        throw new DatabaseError('Error getting roadmap', roadmapId);
      }

      return {
        ...roadmap,
        goals: this.buildGoalTree(await this.goalsService.getGoalsByRoadmapId(roadmap.id)),
      };
    } catch (e) {
      throw new DatabaseError('Error getting roadmap by ID', e);
    }
  }

  public async getRoadmapList(userId: string): Promise<RoadmapListReturnType[]> {
    try {
      const roadmaps = await this.prisma.roadmap.findMany({
        where: {
          userId: userId,
        },
      });

      return await Promise.all(
        roadmaps.map(async (roadmap) => {
          const goals = await this.goalsService.getGoalsByRoadmapId(roadmap.id);

          const totalComplexity = goals.reduce((acc, goal) => acc + goal.complexity, 0);
          const donePercent =
            goals.reduce((acc, goal) => acc + (goal.done ? 1 : 0), 0) / goals.length;

          return { ...roadmap, totalComplexity: totalComplexity, progress: donePercent };
        })
      );
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error getting roadmap by ID', e);
    }
  }

  // honestly better not to use this
  // use getRoadmapById instead
  public async getRoadmaps(userId: string): Promise<Roadmap[]> {
    try {
      const roadmaps = await this.prisma.roadmap.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          description: true,
        },
      });

      return await Promise.all(
        roadmaps.map(async (roadmap) => {
          return {
            ...roadmap,
            goals: this.buildGoalTree(await this.goalsService.getGoalsByRoadmapId(roadmap.id)),
          };
        })
      );
    } catch (e) {
      throw new DatabaseError('Error getting roadmaps', e);
    }
  }

  private buildGoalTree(goals: Omit<Goal, 'subgoals'>[]): Goal[] {
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
