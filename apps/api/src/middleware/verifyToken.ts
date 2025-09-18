import type { NextFunction, Request, Response } from 'express';
import ServerStatuses from '../config/serverStatuses';
import jwt from 'jsonwebtoken';
import { userService } from '../services';

interface JwtPayload {
  userId: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: string | undefined = (req.cookies as Record<string, string | undefined>)[
      'jwtToken'
    ];

    const jwtSecretKey = process.env.JWT_SECRET;

    if (typeof jwtSecretKey !== 'string') {
      res
        .status(ServerStatuses.BACKEND_ERROR)
        .json({ message: 'Critical backend authorization error. Please try later.' });
      return;
    }

    if (!token) {
      res.status(ServerStatuses.UNAUTHORIZED).json({ message: 'No token found.' });
      return;
    }

    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;

    req.user = await userService.getUserById(decoded.userId);

    next();
  } catch {
    res.status(ServerStatuses.UNAUTHORIZED).json({ message: 'Token authorization failed.' });
    return;
  }
};

export default verifyToken;
