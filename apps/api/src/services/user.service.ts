import type { User } from '@roadmap-io/types';
import prisma from '../lib/prisma';
import DatabaseError from '../errors/databaseError';

class UserService {
  public async getUserByEmail(email: string): Promise<User> {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name: email.split('@')[0] },
      });
    }

    return user;
  }

  getUserById = async (userId: string): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new DatabaseError('not found');
    }

    return user;
  };
}

export default UserService;
