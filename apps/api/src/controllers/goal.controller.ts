import type { Request, Response } from 'express';
import ServerStatuses from '../config/serverStatuses';
import type GoalService from '../services/goal.service';
import { GoalPayload } from '@roadmap-io/types';

class GoalController {
  private goalService;

  constructor(goalService: GoalService) {
    this.goalService = goalService;
  }

  public createGoal = (req: Request, res: Response): void => {
    const parsedBody = GoalPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({ Error: parsedBody.error });
      return;
    }

    const { title, roadmapId } = parsedBody.data;

    this.goalService
      .createGoal(title, roadmapId)
      .then((goal) => {
        res.status(ServerStatuses.CREATED).json(goal);
      })
      .catch((e: unknown) => {
        console.error('Error creating goal. Error: ', e);
        res.status(ServerStatuses.BACKEND_ERROR).json({ Error: e });
      });
  };

  public getGoals = (): void => {
    //todo create get goals route
    return;
  };
}

export default GoalController;
