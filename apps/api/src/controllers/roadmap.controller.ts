import type RoadmapService from '../services/roadmap.service';
import ServerStatuses from '../config/serverStatuses';
import type { Request, Response } from 'express';
import { getRoadmapsPayload, roadmapPayload } from '@roadmap-io/types';

class RoadmapController {
  private roadmapService: RoadmapService;

  constructor(roadmapService: RoadmapService) {
    this.roadmapService = roadmapService;
  }

  public createRoadmap = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = roadmapPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({
        Error: parsedBody.error,
      });
      return;
    }

    const { title, userId, description } = parsedBody.data;

    try {
      const roadmap = await this.roadmapService.createRoadmap(title, userId, description);
      res.status(ServerStatuses.OK).json({ message: 'Success', roadmap: roadmap });
    } catch (e) {
      console.error(e);
      res.status(ServerStatuses.BACKEND_ERROR).json({ message: 'Failed to create roadmap' });
    }
  };

  public getRoadmaps = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = getRoadmapsPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({
        Error: parsedBody.error,
      });
      return;
    }

    const { userId } = parsedBody.data;

    try {
      const roadmaps = await this.roadmapService.getRoadmaps(userId);
      res.status(ServerStatuses.OK).json({ message: 'Success', roadmaps: roadmaps });
    } catch (e) {
      console.error(e);
      res.status(ServerStatuses.BACKEND_ERROR).json({ error: 'Failed to get roadmaps' });
    }
  };
}

export default RoadmapController;
