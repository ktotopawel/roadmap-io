import { Router } from 'express';
import { authRouter, goalsRouter, roadmapRouter, usersRouter } from './routes';
import serverRoutes from './config/serverRoutes';
import verifyToken from './middleware/verifyToken';
import asyncHandler from './middleware/asyncHandler';

const router = Router();

router.use(serverRoutes.roadmaps.base, asyncHandler(verifyToken), roadmapRouter);
router.use(serverRoutes.goals.base, asyncHandler(verifyToken), goalsRouter);
router.use(serverRoutes.users.base, asyncHandler(verifyToken), usersRouter);
router.use(serverRoutes.auth.base, authRouter);

export default router;
