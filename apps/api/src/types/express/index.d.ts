import type { User } from '@roadmap-io/types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
