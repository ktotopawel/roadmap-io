import type AuthService from '../services/auth.service';
import type { Request, Response } from 'express';
import { LoginPayloadSchema, ConsumeTokenPayloadSchema } from '@roadmap-io/types';
import ServerStatuses from '../config/serverStatuses';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public getMagicLink = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = LoginPayloadSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({ Error: parsedBody.error });
      return;
    }

    const { email } = parsedBody.data;

    try {
      await this.authService.magicLink(email);
      res.status(ServerStatuses.OK).json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(ServerStatuses.BACKEND_ERROR).json({ message: 'Failed to generate magic link' });
    }
  };

  public consumeToken = async (req: Request, res: Response): Promise<void> => {
    const parsedBody = ConsumeTokenPayloadSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(ServerStatuses.BAD_REQUEST).json({ Error: parsedBody.error });
      return;
    }

    const { token, email } = parsedBody.data;

    try {
      const jwt = await this.authService.consumeToken(email, token);
      res
        .status(ServerStatuses.OK)
        .cookie('jwtToken', jwt, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 604800000,
        })
        .json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(ServerStatuses.BACKEND_ERROR).json({ message: 'Error consuming token' });
    }
  };
}

export default AuthController;
