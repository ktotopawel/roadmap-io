import prisma from '../prisma/prisma';
import DatabaseError from '../errors/databaseError';
import type { Goal } from '@roadmap-io/types';

class GoalService {
  public async createGoal(
    title: string,
    roadmapId: string
  ): Promise<Omit<Goal, 'subgoals' | 'tasks'>> {
    try {
      return await prisma.goal.create({
        data: {
          title: title,
          parentId: null,
          roadmapId: roadmapId,
        },
      });
    } catch (error) {
      throw new DatabaseError('Error creating goal', error);
    }
  }

  public async getGoalByRoadmapId(roadmapId: string): Promise<Array<Omit<Goal, 'subgoals'>>> {
    try {
      return await prisma.goal.findMany({
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
