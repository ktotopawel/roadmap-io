import prisma from '../../prisma/prisma';

class RoadmapService {
  async createRoadmap(title: string) {
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
}

export default RoadmapService;
