import { AppError } from './appError';

export default class DatabaseError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super(message);
    if (originalError instanceof Error) {
      this.stack = originalError.stack;
    }
  }
}
