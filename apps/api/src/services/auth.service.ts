import type { Token, User } from '@roadmap-io/types';
import { v4 as uuidv4 } from 'uuid';
import { MissingEnvError } from '../errors/missingEnvError';
import jwt from 'jsonwebtoken';
import type UserService from './user.service';
import type { PrismaClient } from '@prisma/client';
import type EmailService from './email.service';

class AuthService {
  private FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  private readonly userService: UserService;
  private readonly prisma: PrismaClient;
  private readonly jwtSecret: string | undefined;
  private readonly mailer: EmailService;

  constructor(
    prisma: PrismaClient,
    userService: UserService,
    jwtSecret: string | undefined,
    mailer: EmailService
  ) {
    this.userService = userService;
    this.prisma = prisma;
    this.jwtSecret = jwtSecret;
    this.mailer = mailer;
  }

  public async magicLink(email: string): Promise<void> {
    const magicLink = await this.generateMagicLink(email);

    //eslint-disable-next-line no-console
    console.log(`Magic Link: ${magicLink}`);

    try {
      await this.mailer.sendEmail({
        to: email,
        subject: 'roadmap-io: Authorization magic link',
        html: `<a href="${magicLink}">Click me to verify!</a>`,
      });
    } catch (e) {
      console.error('Magic Link Error', e);
    }
  }

  public async consumeToken(email: string, token: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: {
        tokens: true,
      },
    });

    if (!user) {
      throw new Error('No user found for this email');
    }

    const foundToken = await this.prisma.token.findUnique({
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

    await this.prisma.token.update({
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
    const user = await this.userService.getUserByEmail(email);
    const token = await this.generateToken(user.id);

    return this.FRONTEND_URL + '/auth/magic?token=' + token.token + '&email=' + email;
  }

  private async generateToken(userId: string): Promise<Token> {
    const tokenString = uuidv4();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    return this.prisma.token.create({
      data: {
        token: tokenString,
        userId: userId,
        expiresAt: expiresAt,
      },
    });
  }

  private validateToken(token: Token): boolean {
    const now = new Date();
    return token.expiresAt > now && !token.usedAt;
  }

  private generateJwt(user: User): string {
    const JWT_KEY = this.jwtSecret;

    if (!JWT_KEY) {
      throw new MissingEnvError('JWT_KEY');
    }

    return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: 604800000 });
  }
}

export default AuthService;
