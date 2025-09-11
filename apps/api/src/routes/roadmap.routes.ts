import { Router } from 'express';
import { RoadmapController } from '../controllers';
import { RoadmapService } from '../services';

const router = Router();

const roadmapService = new RoadmapService();
const roadmapController = new RoadmapController(roadmapService);

router.post('/', roadmapController.createRoadmap);
router.get('/', roadmapController.getRoadmaps);

export default router;
