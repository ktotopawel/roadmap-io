import { Router } from 'express';
import { RoadmapController } from '../controllers';
import ServerRoutes from '../config/serverRoutes';

const router = Router();

const roadmapController = new RoadmapController();

router.post(ServerRoutes.roadmap, roadmapController.createRoadmap);

export default router;
