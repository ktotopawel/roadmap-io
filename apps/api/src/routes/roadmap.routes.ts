import { Router } from 'express';
import { roadmapController } from '../controllers';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

const { createRoadmap, getRoadmaps } = roadmapController;

router.post('/', asyncHandler(createRoadmap));
router.get('/', asyncHandler(getRoadmaps));

export default router;
