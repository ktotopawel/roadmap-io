import express from 'express';
import ServerRoutes from '../config/serverRoutes';
import asyncHandler from '../middleware/asyncHandler';
import { authController } from '../controllers';

const router = express.Router();

const { getMagicLink, consumeToken } = authController;

router.post(ServerRoutes.auth.magicLink, asyncHandler(getMagicLink));
router.post(ServerRoutes.auth.consumeToken, asyncHandler(consumeToken));

export default router;
