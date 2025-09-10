import RoadmapService from '../services/roadmap.service';
import ServerStatuses from '../config/serverStatuses';
import type { Request, Response } from 'express';
import { getRoadmapsPayload, roadmapPayload } from '@roadmap-io/types';

class RoadmapController {
  private roadmapService: RoadmapService;

  constructor() {
    this.roadmapService = new RoadmapService();
  }

  public createRoadmap = async (req: Request, res: Response): Promise<Response> => {
    const parsedBody = roadmapPayload.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(ServerStatuses.BAD_REQUEST).json({
        error: `${ServerStatuses.BAD_REQUEST} Bad request. \n Error: ${parsedBody.error}`,
      });
    }

    const { title, userId } = parsedBody.data;

    try {
      const roadmap = await this.roadmapService.createRoadmap(title, userId);

      return res.status(ServerStatuses.CREATED).send(roadmap);
    } catch (e) {
      console.error('Error creating roadmap. Error: ', e);
      return res.status(ServerStatuses.BACKEND_ERROR).send({ error: 'Failed to create roadmap' });
    }
  };

  public getRoadmaps = async (req: Request, res: Response): Promise<Response> => {
    const parsedBody = getRoadmapsPayload.safeParse(req.body);
    const badRequestCode = ServerStatuses.BAD_REQUEST.toString();

    if (!parsedBody.success) {
      const error =
        parsedBody.error.message + '\n' + parsedBody.error.stack || 'No stack trace available';
      return res.status(ServerStatuses.BAD_REQUEST).json({
        error: `${badRequestCode} Bad request. \n Error: ${error}`,
      });
    }

    const { userId } = parsedBody.data;

    try {
      const roadmaps = await this.roadmapService.getRoadmaps(userId);
      return res.status(ServerStatuses.OK).send(roadmaps);
    } catch (e) {
      console.error('Error fetching roadmaps. Error: ', e);
      return res.status(ServerStatuses.BACKEND_ERROR).send({ error: 'Failed to fetch roadmaps' });
    }
  };
}

export default RoadmapController;
