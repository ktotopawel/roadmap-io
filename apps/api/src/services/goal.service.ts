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
    description: string
  ): Promise<Omit<Goal, 'subgoals' | 'tasks'>> {
    try {
      return await this.prisma.goal.create({
        data: {
          title: title,
          parentId: null,
          roadmapId: roadmapId,
          description: description,
        },
      });
    } catch (error) {
      throw new DatabaseError('Error creating goal', error);
    }
  }

  public async getGoalByRoadmapId(roadmapId: string): Promise<Array<Omit<Goal, 'subgoals'>>> {
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
}

export default GoalService;
