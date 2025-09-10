import type { Request, Response } from 'express';
import ServerStatuses from '../config/serverStatuses';
import GoalService from '../services/goal.service';

class GoalController {
  private goalService;

  constructor() {
    this.goalService = new GoalService();
  }

  public createGoal = async (req: Request, res: Response) => {
    const { title, roadmapId } = req.body;

    try {
      const goal = await this.goalService.createGoal(title, roadmapId);
      return res.status(ServerStatuses.CREATED).json(goal);
    } catch (e) {
      console.error('Error creating goal. Error: ', e);
      return res.status(ServerStatuses.BACKEND_ERROR).json({ error: e });
    }
  };

  getGoals() {
    //todo create get goals route
    return false;
  }
}

export default GoalController;
