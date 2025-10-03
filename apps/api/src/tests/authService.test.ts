import AuthService from '../services/auth.service';
import { prismaMock } from './__mocks__/prismaMock';
import type UserService from '../services/user.service';
import type EmailService from '../services/email.service';
import type { Token, User } from '@roadmap-io/types';

jest.mock('uuid', () => ({ v4: jest.fn(() => 'fixed-uuid-123') }));
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(() => 'signed-jwt-token') }));

const mockUserService = {
  getOrCreateUserByEmail: jest.fn(),
};

const mockEmailService = {
  sendEmail: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  const email = 'test@email.com';
  const mockUser: User = {
    email: email,
    id: 'test-id',
    name: 'test',
    createdAt: new Date(),
  };
  const mockToken: Token = {
    id: 'test-id',
    token: 'signed-jwt-token',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    userId: 'test-id',
    usedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new AuthService(
      prismaMock,
      mockUserService as unknown as UserService,
      'jwt-secret',
      mockEmailService as unknown as EmailService
    );
  });

  test('should send magicLink', async () => {
    mockUserService.getOrCreateUserByEmail.mockResolvedValue(mockUser);
    prismaMock.token.create.mockResolvedValue(mockToken);
    mockEmailService.sendEmail.mockResolvedValue(undefined);

    await service.magicLink(email);

    expect(mockUserService.getOrCreateUserByEmail).toHaveBeenCalledWith(email);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaMock.token.create).toHaveBeenCalledWith({
      data: {
        token: 'fixed-uuid-123',
        userId: 'test-id',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expiresAt: expect.any(Date),
      },
    });
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'roadmap-io: Authorization magic link',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      html: expect.stringContaining('/auth/magic?token=' + 'signed-jwt-token' + '&email=' + email),
    });
  });

  test('should consume token', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue({ ...mockUser, tokens: [mockToken] });
    prismaMock.token.findUnique.mockResolvedValue(mockToken);

    const response = await service.consumeToken(email, mockToken.token);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: email },
      include: { tokens: true },
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaMock.token.findUnique).toHaveBeenCalledWith({
      where: { token: mockToken.token },
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaMock.token.update).toHaveBeenCalledWith({
      where: { token: mockToken.token },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        usedAt: expect.any(Date),
      },
    });

    expect(response).toEqual('signed-jwt-token');
  });
});
