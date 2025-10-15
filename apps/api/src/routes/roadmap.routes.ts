import { Router } from 'express';
import { roadmapController } from '../controllers';
import asyncHandler from '../middleware/asyncHandler';
import ServerRoutes from '../config/serverRoutes';

const router = Router();

const { createRoadmap, getRoadmaps, getRoadmapList, getRoadmapById } = roadmapController;

router.post('/', asyncHandler(createRoadmap));
router.get('/', asyncHandler(getRoadmaps));
router.get(ServerRoutes.roadmaps.list, asyncHandler(getRoadmapList));
router.get(ServerRoutes.roadmaps.byId, asyncHandler(getRoadmapById));

export default router;
