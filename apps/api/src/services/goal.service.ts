import DatabaseError from '../errors/databaseError';
import type { Goal } from '@roadmap-io/types';
import type { PrismaClient } from '@prisma/client';

class GoalService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async createGoal(
    title: string,
    roadmapId: string,
    required: boolean,
    complexity: number,
    description?: string
  ): Promise<Omit<Goal, 'subgoals' | 'tasks'>> {
    try {
      return await this.prisma.goal.create({
        data: {
          title: title,
          parentId: null,
          roadmapId: roadmapId,
          description: description ?? null,
          required: required,
          complexity: complexity,
        },
      });
    } catch (error) {
      throw new DatabaseError('Error creating goal', error);
    }
  }

  public async getGoalsByRoadmapId(roadmapId: string): Promise<Array<Omit<Goal, 'subgoals'>>> {
    try {
      return await this.prisma.goal.findMany({
        where: { roadmapId: roadmapId },
        include: {
          tasks: true,
        },
      });
    } catch (e) {
      throw new DatabaseError('Error fetching goals by roadmap ID', e);
    }
  }

  public async getGoalComplexity(goalId: string): Promise<number> {
    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new DatabaseError('Goal not found', null);
    }

    // get all goals for the "owner" roadmap - much better way than recursive queries
    const goalsFromParentRoadmap = await this.prisma.goal.findMany({
      where: {
        roadmapId: goal.roadmapId,
      },
    });

    const goalMap = new Map(goalsFromParentRoadmap.map((g) => [g.id, g]));

    const calculateComplexity = (currentGoalId: string): number => {
      const currentGoal = goalMap.get(currentGoalId);
      if (!currentGoal) {
        return 0;
      }

      const subgoals = goalsFromParentRoadmap.filter((g) => g.parentId === currentGoalId);

      if (subgoals.length === 0) {
        return currentGoal.complexity;
      } else {
        return subgoals.reduce((acc, goal) => acc + calculateComplexity(goal.id), 0);
      }
    };

    return calculateComplexity(goalId);
  }
}

export default GoalService;
