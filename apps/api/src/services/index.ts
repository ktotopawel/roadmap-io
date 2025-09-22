import UserService from './user.service';
import AuthService from './auth.service';
import GoalService from './goal.service';
import RoadmapService from './roadmap.service';
import prisma from '../lib/prisma';
import EmailService from './email.service';

const jwtSecret = process.env.JWT_SECRET;

const emailService = EmailService.instance;

const userService = new UserService(prisma);
const authService = new AuthService(prisma, userService, jwtSecret, emailService);
const goalService = new GoalService(prisma);
const roadmapService = new RoadmapService(prisma, goalService);

export { userService, authService, goalService, roadmapService };
