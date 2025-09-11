import type { Request, Response } from 'express';
import ServerStatuses from '../config/serverStatuses';
import type GoalService from '../services/goal.service';
import { GoalPayload } from '@roadmap-io/types';
import UnimplementedError from '../errors/unimplementedError';

class GoalController {
  private goalService;

  constructor(goalService: GoalService) {
    this.goalService = goalService;
  }

  public createGoal = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = GoalPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({ Error: parsedBody.error });
      return;
    }

    const { title, roadmapId } = parsedBody.data;

    try {
      const goal = await this.goalService.createGoal(title, roadmapId);
      res.status(ServerStatuses.OK).json({ message: 'Success', goal: goal });
    } catch (e) {
      console.error('Error creating goal, Error: ', e);
      res.status(ServerStatuses.BACKEND_ERROR).json({ error: 'Error creating goal' });
    }
  };

  public getGoals = (): Promise<void> => {
    //todo create get goals route
    throw new UnimplementedError('Get goals not implemented');
  };
}

export default GoalController;
