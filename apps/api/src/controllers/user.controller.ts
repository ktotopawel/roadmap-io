import type UserService from '../services/user.service';
import type { Request, Response } from 'express';
import { GetUserPayload } from '@roadmap-io/types';
import ServerStatuses from '../config/serverStatuses';

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = GetUserPayload.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({ Error: parsedBody.error });
      return;
    }

    const { email } = parsedBody.data;

    try {
      const user = await this.userService.getUserByEmail(email);
      res.status(ServerStatuses.OK).json(user);
      return;
    } catch (e) {
      console.error(e);
      res.status(ServerStatuses.BACKEND_ERROR).json({ Error: 'Failed to get user.' });
      return;
    }
  };
}

export default UserController;
