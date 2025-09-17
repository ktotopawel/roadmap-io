import UserService from './user.service';
import AuthService from './auth.service';
import GoalService from './goal.service';
import RoadmapService from './roadmap.service';

const userService = new UserService();
const authService = new AuthService(userService);
const goalService = new GoalService();
const roadmapService = new RoadmapService(goalService);

export { userService, authService, goalService, roadmapService };
