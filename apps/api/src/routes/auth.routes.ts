import express from 'express';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import ServerRoutes from '../config/serverRoutes';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

const authService = new AuthService();
const { getMagicLink, consumeToken } = new AuthController(authService);

router.post(ServerRoutes.auth.magicLink, asyncHandler(getMagicLink));
router.post(ServerRoutes.auth.consumeToken, asyncHandler(consumeToken));

export default router;
