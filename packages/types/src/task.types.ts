import * as z from 'zod';

export const TaskSchema = z.object({
  id: z.string().cuid(),
  goalId: z.string().cuid(),
  title: z.string().min(1, "Title can't be empty"),
  status: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
