import { AppError } from './appError';

export class MissingEnvError extends AppError {
  constructor(envVar: string, originalError?: Error) {
    const message = `Missing environment variable: ${envVar}`;
    super(message);
    if (originalError instanceof Error) {
      this.stack = originalError.stack;
    }
  }
}
