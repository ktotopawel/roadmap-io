import GoalService from '../services/goal.service';
import { Request, Response } from 'express';
import ServerStatuses from '../config/serverStatuses';

class GoalController {
  private goalService;

  constructor() {
    this.goalService = new GoalService();
  }

  public createGoal = async (req: Request, res: Response) => {
    const { title } = req.body;

    try {
      const goal = await this.goalService.createGoal(title);
      return res.status(ServerStatuses.CREATED).json(goal);
    } catch (e) {
      return res.status(ServerStatuses.BACKEND_ERROR).json({ error: e });
    }
  };

  getGoals() {
    //todo create get goals route
    return false;
  }
}

export default GoalController;
