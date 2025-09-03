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

  public async getGoalByRoadmapId(roadmapId: string) {
    try {
      return await prisma.goal.findMany({
        where: { roadmapId: roadmapId },
        include: {
          tasks: true,
        },
      });
    } catch (e) {
      console.error('Error fetching goals by roadmapId. Error: ', e);
      throw new Error(`Error fetching goals by roadmapId: ${e}`);
    }
  }
}

export default GoalService;
