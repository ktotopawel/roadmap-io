import type RoadmapService from '../services/roadmap.service';
import ServerStatuses from '../config/serverStatuses';
import type { Request, Response } from 'express';
import { getRoadmapsPayload, roadmapPayload } from '@roadmap-io/types';

class RoadmapController {
  private roadmapService: RoadmapService;

  constructor(roadmapService: RoadmapService) {
    this.roadmapService = roadmapService;
  }

  public createRoadmap = (req: Request, res: Response): void => {
    const parsedBody = roadmapPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({
        Error: parsedBody.error,
      });
      return;
    }

    const { title, userId } = parsedBody.data;

    this.roadmapService
      .createRoadmap(title, userId)
      .then((result) => {
        res.status(ServerStatuses.CREATED).json(result);
      })
      .catch((e: unknown) => {
        console.error(e);
        res.status(ServerStatuses.BAD_REQUEST).json({ error: 'Failed to create a roadmap' });
      });
  };

  public getRoadmaps = (req: Request, res: Response): void => {
    const parsedBody = getRoadmapsPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({
        Error: parsedBody.error,
      });
      return;
    }

    const { userId } = parsedBody.data;

    this.roadmapService
      .getRoadmaps(userId)
      .then((result) => {
        res.status(ServerStatuses.OK).json(result);
      })
      .catch((e: unknown) => {
        console.error(e);
        res.status(ServerStatuses.BAD_REQUEST).json({ Error: 'Failed to fetch roadmaps' });
      });
  };
}

export default RoadmapController;
