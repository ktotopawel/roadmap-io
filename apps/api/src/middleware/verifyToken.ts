import type { Request, Response, NextFunction } from 'express';
import ServerStatuses from '../config/serverStatuses';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token: string | undefined = req.cookies?.['jwtToken'];
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

    jwt.verify(token, jwtSecretKey);

    next();
  } catch (e) {
    res.status(ServerStatuses.UNAUTHORIZED).json({ message: 'Token authorization failed.' });
    return;
  }
};

export default verifyToken;
