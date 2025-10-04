import type { User } from '@roadmap-io/types';
import DatabaseError from '../errors/databaseError';
import type { PrismaClient } from '@prisma/client';

class UserService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public getOrCreateUserByEmail = async (email: string): Promise<User> => {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      try {
        user = await this.prisma.user.create({
          data: { email, name: email.split('@')[0] },
        });
      } catch (e) {
        throw new DatabaseError('Failed to create user ', e);
      }
    }

    return user;
  };

  public getUserById = async (userId: string): Promise<User> => {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new DatabaseError('not found');
    }

    return user;
  };
}

export default UserService;
