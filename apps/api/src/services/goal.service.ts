import prisma from '../../prisma/prisma';

class GoalService {
  public async createGoal(title: string, roadmapId: string) {
    try {
      return await prisma.goal.create({
        data: {
          title: title,
          parentId: null,
          roadmapId: roadmapId,
        },
      });
    } catch (error) {
      throw new Error(`Error creating goal: ${error}`);
    }
  }
}

export default GoalService;
