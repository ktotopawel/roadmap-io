import { AppError } from './appError';

class UnimplementedError extends AppError {
  constructor(message: string, error?: unknown) {
    super(message);
    if (error instanceof Error) {
      this.stack = error.stack;
    }
  }
}

export default UnimplementedError;
