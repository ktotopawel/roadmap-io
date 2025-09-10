import * as z from 'zod';

export const TokenSchema = z.object({
  id: z.cuid(),
  token: z.string(),
  userId: z.cuid(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  usedAt: z.coerce.date().nullable(),
});

export type Token = z.infer<typeof TokenSchema>;
