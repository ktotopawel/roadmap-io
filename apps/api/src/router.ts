import { Router } from 'express';
import { authRouter, goalsRouter, roadmapRouter, usersRouter } from './routes';
import serverRoutes from './config/serverRoutes';
import verifyToken from './middleware/verifyToken';

const router = Router();

router.use(serverRoutes.roadmaps, verifyToken, roadmapRouter);
router.use(serverRoutes.goals, verifyToken, goalsRouter);
router.use(serverRoutes.users.base, verifyToken, usersRouter);
router.use(serverRoutes.auth.base, authRouter);

export default router;
