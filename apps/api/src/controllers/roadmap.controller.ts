import RoadmapService from '../services/roadmap.service';
import ServerStatuses from '../config/serverStatuses';
import { Request, Response } from 'express';
import { roadmapPayload } from '@roadmap-io/types/src';

class RoadmapController {
  private roadmapService: RoadmapService;

  constructor() {
    this.roadmapService = new RoadmapService();
  }

  public createRoadmap = async (req: Request, res: Response) => {
    const parsedBody = roadmapPayload.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(ServerStatuses.BAD_REQUEST).json({
        error: `${ServerStatuses.BAD_REQUEST} Bad request. \n Error: ${parsedBody.error}`,
      });
    }

    const { title } = parsedBody.data;

    try {
      const roadmap = this.roadmapService.createRoadmap(title);

      return res.status(ServerStatuses.CREATED).send(roadmap);
    } catch (e) {
      console.error('Error creating roadmap. Error: ', e);
      return res.status(ServerStatuses.BACKEND_ERROR).send({ error: 'Failed to create roadmap' });
    }
  };
}

export default RoadmapController;
