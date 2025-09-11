import express from 'express';
import { GoalController } from '../controllers';
import { GoalService } from '../services';

const router = express.Router();

const goalService = new GoalService();
const goalController = new GoalController(goalService);

router.get('/', goalController.getGoals);
router.post('/', goalController.createGoal);

export default router;
