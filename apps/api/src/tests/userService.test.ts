/* eslint-disable @typescript-eslint/unbound-method */
import UserService from '../services/user.service';
import { prismaMock } from './__mocks__/prismaMock';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(prismaMock);
  });

  describe('getOrCreateUserByEmail', () => {
    it('returns existing user if found', async () => {
      const existingUser = {
        id: '1',
        email: 'test@example.com',
        name: 'test',
        createdAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      const user = await userService.getOrCreateUserByEmail('test@example.com');

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(user).toEqual(existingUser);
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('creates and returns user if not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const newUser = {
        id: '2',
        email: 'new@example.com',
        name: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.user.create.mockResolvedValue(newUser);

      const user = await userService.getOrCreateUserByEmail('new@example.com');

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'new@example.com' },
      });
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: { email: 'new@example.com', name: 'new' },
      });
      expect(user).toEqual(newUser);
    });
  });

  describe('getUserById', () => {
    it('returns user when found by id', async () => {
      const foundUser = {
        id: '123',
        email: 'id@example.com',
        name: 'iduser',
        createdAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(foundUser);

      const user = await userService.getUserById('123');

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(user).toEqual(foundUser);
    });
  });
});
