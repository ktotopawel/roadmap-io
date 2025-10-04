import type { Config } from 'jest';

const config: Config = {
  displayName: 'api',
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/__mocks__/prismaMock.ts'],
  testMatch: ['<rootDir>/src/tests/**/*.+(spec|test).+(ts|js)'],
};

export default config;
