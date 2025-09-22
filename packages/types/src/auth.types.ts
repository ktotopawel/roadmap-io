import { z } from 'zod';

export const LoginPayloadSchema = z.object({
  email: z.email(),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

export const ConsumeTokenPayloadSchema = z.object({
  token: z.string().min(1),
  email: z.email(),
});

export type ConsumeTokenPayload = z.infer<typeof ConsumeTokenPayloadSchema>;
