import { Router } from 'express';
import { goalsRouter, roadmapRouter } from './routes';
import serverRoutes from './config/serverRoutes';

const router = Router();

router.use(serverRoutes.roadmaps, roadmapRouter);

router.use(serverRoutes.goals, goalsRouter);

export default router;
