import { Router } from 'express';
import { RoadmapController } from '../controllers';

const router = Router();

const roadmapController = new RoadmapController();

router.post('/', roadmapController.createRoadmap);
router.get('/', roadmapController.getRoadmaps);

export default router;
