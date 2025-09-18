import AuthController from './auth.controller';
import GoalController from './goal.controller';
import RoadmapController from './roadmap.controller';
import { authService, goalService, roadmapService, userService } from '../services';
import UserController from './user.controller';

const authController = new AuthController(authService);
const goalController = new GoalController(goalService);
const roadmapController = new RoadmapController(roadmapService);
const userController = new UserController(userService);

export { authController, goalController, roadmapController, userController };
