import { Router } from 'express';
import { RoadmapController } from '../controllers';
import { RoadmapService } from '../services';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

const roadmapService = new RoadmapService();
const roadmapController = new RoadmapController(roadmapService);

router.post('/', asyncHandler(roadmapController.createRoadmap));
router.get('/', asyncHandler(roadmapController.getRoadmaps));

export default router;
