import type { Token, User } from '@roadmap-io/types';
import prisma from '../../prisma/prisma';
import { v4 as uuidv4 } from 'uuid';
import { MissingEnvError } from '../errors/missingEnvError';
import jwt from 'jsonwebtoken';

class AuthService {
  private FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

  public async magicLink(email: string): Promise<void> {
    const magicLink = await this.generateMagicLink(email);

    //eslint-disable-next-line no-console
    console.log(`Magic Link: ${magicLink}`);
  }

  public async consumeToken(email: string, token: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        tokens: true,
      },
    });

    if (!user) {
      throw new Error('No user found for this email');
    }

    const foundToken = await prisma.token.findUnique({
      where: {
        token: token,
      },
    });

    if (!foundToken) {
      throw new Error('No token found for this email');
    }

    if (!this.validateToken(foundToken)) {
      throw new Error('Token expired');
    }

    await prisma.token.update({
      where: {
        token: token,
      },
      data: {
        usedAt: new Date(),
      },
    });

    return this.generateJwt(user);
  }

  private async generateMagicLink(email: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    const token = await this.generateToken(user.id);

    return this.FRONTEND_URL + '/auth/magic?token=' + token.token + '&email=' + email;
  }

  private async generateToken(userId: string): Promise<Token> {
    const tokenString = uuidv4();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    return prisma.token.create({
      data: {
        token: tokenString,
        userId: userId,
        expiresAt: expiresAt,
      },
    });
  }

  private async getUserByEmail(email: string): Promise<User> {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name: email.split('@')[0] },
      });
    }

    return user;
  }

  private validateToken(token: Token): boolean {
    const now = new Date();
    return token.expiresAt > now && !token.usedAt;
  }

  private generateJwt(user: User): string {
    const JWT_KEY = process.env.JWT_SECRET;

    if (!JWT_KEY) {
      throw new MissingEnvError('JWT_KEY');
    }

    return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: 604800000 });
  }
}

export default AuthService;
