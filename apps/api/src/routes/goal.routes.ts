import express from 'express';
import { GoalController } from '../controllers';
import { GoalService } from '../services';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

const goalService = new GoalService();
const goalController = new GoalController(goalService);

router.get('/', asyncHandler(goalController.getGoals));
router.post('/', asyncHandler(goalController.createGoal));

export default router;
