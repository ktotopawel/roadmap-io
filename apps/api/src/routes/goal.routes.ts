import express from 'express';
import { goalController } from '../controllers';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

const { getGoals, createGoal } = goalController;

router.get('/', asyncHandler(getGoals));
router.post('/', asyncHandler(createGoal));

export default router;
