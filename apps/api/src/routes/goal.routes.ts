import express from 'express';
import { GoalController } from '../controllers';

const router = express.Router();

const goalController = new GoalController();

router.get('/', goalController.getGoals);
router.post('/', goalController.createGoal);

export default router;
