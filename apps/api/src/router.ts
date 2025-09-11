import { Router } from 'express';
import { authRouter, goalsRouter, roadmapRouter } from './routes';
import serverRoutes from './config/serverRoutes';

const router = Router();

router.use(serverRoutes.roadmaps, roadmapRouter);
router.use(serverRoutes.goals, goalsRouter);
router.use(serverRoutes.auth.base, authRouter);

export default router;
