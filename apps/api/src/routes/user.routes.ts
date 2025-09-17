import express from 'express';
import ServerRoutes from '../config/serverRoutes';
import asyncHandler from '../middleware/asyncHandler';
import { userController } from '../controllers';

const router = express.Router();

router.post(ServerRoutes.users.me, asyncHandler(userController.getUserByEmail));

export default router;
