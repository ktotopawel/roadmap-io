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

  // note: this is highly inefficient, but works for now
  // either cache or calculate at fetch
  public async getGoalComplexity(goalId: string): Promise<number> {
    try {
      const goal = await this.prisma.goal.findUnique({
        where: { id: goalId },
      });

      if (!goal) {
        throw new DatabaseError('Error fetching goal', goalId);
      }

      const subgoals = await this.prisma.goal.findMany({
        where: { parentId: goalId },
      });

      if (subgoals.length === 0) {
        return goal.complexity;
      }

      return await Promise.all(
        subgoals.map(async (sg) => await this.getGoalComplexity(sg.id))
      ).then((values) => values.reduce((acc, cur) => acc + cur, 0));
    } catch (e) {
      // todo implement error handling
      console.error(e);
      throw e;
    }
  }
}

export default GoalService;
