import express from 'express';
import ServerRoutes from '../config/serverRoutes';
import { GoalController } from '../controllers';

const router = express.Router();

const goalController = new GoalController();

router.get(ServerRoutes.goals, goalController.getGoals);
router.post(ServerRoutes.goal, goalController.createGoal);

export default router;
