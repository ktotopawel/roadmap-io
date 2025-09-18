import express from 'express';
import ServerRoutes from '../config/serverRoutes';
import asyncHandler from '../middleware/asyncHandler';
import { userController } from '../controllers';

const router = express.Router();

router.post(ServerRoutes.users.email, asyncHandler(userController.getUserByEmail));
router.get(ServerRoutes.users.me, userController.getUserByToken);

export default router;
