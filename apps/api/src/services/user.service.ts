import type { User } from '@roadmap-io/types';
import prisma from '../lib/prisma';

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
}

export default UserService;
