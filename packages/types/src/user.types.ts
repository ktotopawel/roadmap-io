import * as z from 'zod';

export const UserSchema = z.object({
  id: z.cuid(),
  email: z.email(),
  createdAt: z.coerce.date(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const GetUserPayload = z.object({
  email: z.email(),
});

export type GetUserPayload = z.infer<typeof GetUserPayload>;

export const SerializeUser = z.object({
  id: z.cuid(),
  email: z.email(),
  createdAt: z.iso.datetime(),
  name: z.string(),
});

export type SerializeUser = z.infer<typeof SerializeUser>;
